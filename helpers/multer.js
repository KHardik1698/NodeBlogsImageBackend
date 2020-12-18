const fs = require("fs");
const path = require("path");
const multer = require("multer");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync("uploads/", { recursive: true });
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "blog" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage }).single("imageUrl");

module.exports = upload;
