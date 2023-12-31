const express = require("express");
const path = require("path");
const router = express.Router();
const { upload } = require("../multer");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const sendMail = require("../utils/sendMail");
const sendToken = require("../utils/jwtToken.js");
const { isAuthenticated, isShopAuthenticated } = require("../middleware/auth");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("../utils/ErrorHandler");
const Shop = require("../model/shop");
const sendShopToken = require("../utils/shopToken");

//add Azure Blob
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

router.post("/create-shop", upload.single("file"), async (req, res, next) => {
  try {
    const { email } = req.body;

    const shopEmail = await Shop.findOne({ email });

    if (shopEmail) {
      return next(new ErrorHandler("Seller already exists", 400));
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

    const seller = {
      name: req.body.name,
      email: email,
      password: req.body.password,
      avatar: fileUrl,
      address: req.body.address,
      phoneNumber: req.body.phoneNumber,
      zipCode: req.body.zipCode,
    };

    const activationToken = createActivationToken(seller);
    const activationUrl = `${backend_url}/activation/${activationToken}`;

    try {
      await sendMail({
        email: seller.email,
        subject: "Activate your shop",
        message: `Hello ${seller.name}, please click on the link to activate your shop: ${activationUrl}`,
      });
      res.status(201).json({
        success: true,
        message: `please check your email:- ${seller.email} to activate your shop!`,
      });
    } catch (err) {
      return next(new ErrorHandler(err.message, 500));
    }
  } catch (error) {
    return next(new ErrorHandler(error.message, 400));
  }
});

//create activation token
const createActivationToken = (seller) => {
  return jwt.sign(seller, process.env.ACTIVATION_SECRET, { expiresIn: "5m" });
};

router.post(
  "/shop/activation",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { activation_token } = req.body;
      console.log("Activation token:", activation_token);

      const newSeller = jwt.verify(
        activation_token,
        process.env.ACTIVATION_SECRET
      );

      console.log("New seller:", newSeller);

      if (!newSeller) {
        console.log("Invalid token");
        return next(new ErrorHandler("Invalid token", 400));
      }

      const { name, email, password, avatar, zipCode, address, phoneNumber } =
        newSeller;

      let seller = await Shop.findOne({ email });

      console.log("Existing Seller:", seller);

      if (seller) {
        console.log("Seller already exists");
        return next(new ErrorHandler("Seller already exists", 400));
      }

      seller = await Shop.create({
        name,
        email,
        avatar,
        password,
        zipCode,
        address,
        phoneNumber,
      });

      console.log("Created seller:", seller);

      sendShopToken(seller, 201, res);
    } catch (error) {
      console.log("An error occurred:", error.message);
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

// log in shop
router.post(
  "/login-shop",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return next(new ErrorHandler("Please provide all the fields", 400));
      }
      const shop = await Shop.findOne({ email }).select("+password");

      if (!shop) {
        return next(new ErrorHandler("Shop does not exists!", 400));
      }

      const isPasswordValid = await shop.comparePassword(password);

      if (!isPasswordValid) {
        return next(
          new ErrorHandler("Please provide the correct information", 400)
        );
      }

      sendShopToken(shop, 201, res);
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//load shop
router.get(
  "/getShop",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      console.log(req.shop);
      const shop = await Shop.findById(req.shop.id);
      if (!shop) {
        return next(new ErrorHandler("User doesn't exist", 400));
      }

      res.status(200).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

//log out shop
router.get(
  "/logout",
  isShopAuthenticated,
  catchAsyncErrors(async (req, res, next) => {
    try {
      res.cookie("seller_token", null, {
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

// get shop info
router.get(
  "/get-shop-info/:id",
  catchAsyncErrors(async (req, res, next) => {
    try {
      const shop = await Shop.findById(req.params.id);
      res.status(201).json({
        success: true,
        shop,
      });
    } catch (error) {
      return next(new ErrorHandler(error.message, 500));
    }
  })
);

module.exports = router;
