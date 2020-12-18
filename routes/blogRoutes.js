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

blogRoute
  .route("/")
  .get(getAllBlogs)
  .post(upload.single("imageUrl"), createBlog);

blogRoute.route("/:id").get(getBlogById).delete(deleteBlogById);

module.exports = blogRoute;
