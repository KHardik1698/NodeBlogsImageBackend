const path = require("path");
const express = require("express");
const upload = require("../helpers/multer");
const { getAllBlogs, createBlog } = require("../controllers/blogControllers");
const blogRoute = express.Router();

blogRoute.route("/").get(getAllBlogs);

blogRoute.post("/", upload.single("imageUrl"), (req, res, next) => {
  let pathName = " ";
  let linksArray = req.body.links.split(",");
  if (req.file) {
    pathName = path.join(__dirname, req.file.path);
  }
  next(createBlog(req, res, next, pathName, linksArray));
});

module.exports = blogRoute;
