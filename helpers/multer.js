const fs = require("fs");
const path = require("path");
const multer = require("multer");
const AppError = require("./appErrorClass");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    fs.mkdirSync("uploads/", { recursive: true });
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, "blog" + "-" + Date.now() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  let ext = path.extname(file.originalname);
  if (ext !== ".png" && ext !== ".jpg" && ext !== ".jpeg") {
    return cb(new AppError(406, "Unsuccessful.", "Only Images are allowed."));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).single(
  "imageUrl"
);

module.exports = upload;
