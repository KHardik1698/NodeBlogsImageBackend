const path = require("path");
const express = require("express");
const upload = require("../helpers/multer");
const {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
} = require("../controllers/blogControllers");
const verifyRequestBody = require("../middlewares/validationMiddlewares");
const blogRoute = express.Router();

blogRoute
  .route("/")
  .get(getAllBlogs)
  .post(upload, verifyRequestBody, createBlog);

blogRoute.route("/:id").get(getBlogById).delete(deleteBlogById);

module.exports = blogRoute;
