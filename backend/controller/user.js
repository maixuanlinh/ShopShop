const express = require("express");
const path = require("path");
const User = require("../model/user");
const router = express.Router();
const { upload } = require("../multer");
const ErrorHandler = require("../utils/ErrorHandler");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const fs = require("fs");

const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken");
const { isAuthenticated } = require("../middleware/auth");

const { BlobServiceClient } = require("@azure/storage-blob");
const backend_url = process.env.NODE_ENV === "production"
  ? "https://shopshop.azurewebsites.net"
  : "http://localhost:3000";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING; // You can find this in the Azure portal
const blobServiceClient = BlobServiceClient.fromConnectionString(
  AZURE_STORAGE_CONNECTION_STRING
);
const containerClient = blobServiceClient.getContainerClient(
  process.env.CONTAINER_NAME
);

router.post("/create-user", upload.single("file"), async (req, res, next) => {
  console.log("Received request for /create-user");
  try {
    const { name, email, password } = req.body;

    const userEmail = await User.findOne({ email });


    if (userEmail) {
      return next(new ErrorHandler("User already exists", 400));
    }

    if (!req.file) {
      console.log("No file received in request");
      return next(new ErrorHandler("No file attached", 400));
    }


    // Upload file to Azure
    const blobName = Date.now() + path.extname(req.file.originalname);

    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    await blockBlobClient.upload(req.file.buffer, req.file.size);
    console.log("File uploaded to Azure successfully");

    const fileUrl = blockBlobClient.url;
    console.log("Azure Blob URL: ", fileUrl);

    const user = {
      name: name,
      email: email,
      password: password,
      avatar: fileUrl,
    };

    console.log("user object: ", user);

    const activationToken = createActivationToken(user);
    const activationUrl = `${backend_url}/activation/${activationToken}`;

    try {
  
      await sendMail({
        email: user.email,
        subject: "Activate your account",
        message: `Hello ${user.name}, please click on the link to activate your account: ${activationUrl}`,
      });
    
      res.status(201).json({
        success: true,
        message: `please check your email:- ${user.email} to activate your account!`,
      });
    } catch (err) {

      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    console.log("Error in /create-user route: ", error);
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (user) => {
  return jwt.sign(user, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

router.post(
  "/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log("Activation token:", activation_token);

      const newUser = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      console.log("New user:", newUser);

      if (!newUser) {
        console.log("Invalid token");
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar } = newUser;

      let user = await User.findOne({ email });

      console.log("Existing user:", user);

      if (user) {
        console.log("User already exists");
        return next(new ErrorHandler("User already exists", 400));
      }

      user = await User.create({
        name,
        email,
        avatar,
        password,
      });

      console.log("Created user:", user);

      sendToken(user, 201, res);
    } catch (error) {
      console.log("An error occurred:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log in user
router.post(
  "/login-user",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }
      const user = await User.findOne({ email }).select("+password");

      if (!user) {
        return next(new ErrorHandler("User does not exists!", 400));
      }

      const isPasswordValid = await user.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendToken(user, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load user
router.get(
  "/getuser",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      const user = await User.findById(req.user.id);
      if (!user) {
        console.log("No user exist");
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      console.log("user is logged in", user);
      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out user
router.get(
  "/logout",
  isAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
      });

      res.status(201).json({
        success: true,
        message: "Log out successful!",
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
