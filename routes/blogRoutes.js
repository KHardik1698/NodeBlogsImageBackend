const path = require("path");
const express = require("express");
const upload = require("../helpers/multer");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
} = require("../controllers/blogControllers");
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

blogRoute.route("/:id").get(getBlogById).delete(deleteBlogById);

module.exports = blogRoute;
