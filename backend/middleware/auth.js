const ErrorHandler = require("../utils/ErrorHandler");

const jwt = require("jsonwebtoken");
const catchAsyncErrors = require("./catchAsyncErrors");
const User = require("../model/user");
const Shop = require("../model/shop");

exports.isAuthenticated = catchAsyncErrors(async(req, res, next) => {
    const {token} = req.cookies;

    if (!token) {
      console.log("Auth. token does not exist");
        return next(new ErrorHandler("Please login to continue", 401));

    }

     console.log("Auth. token exist");
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id);
    next();
});

exports.isShopAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { seller_token } = req.cookies;

  if (!seller_token) {
    return next(new ErrorHandler("Please login to continue", 401));
  }

  const decoded = jwt.verify(seller_token, process.env.JWT_SECRET_KEY);
  req.shop = await Shop.findById(decoded.id);
  next();
});
