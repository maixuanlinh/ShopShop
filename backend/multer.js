const multer = require("multer");

exports.upload = multer({ storage: multer.memoryStorage() });

