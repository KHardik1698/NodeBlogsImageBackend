const mongoose = require("mongoose");
const BlogSchema = require("../models/blogModel");
const upload = require("../helpers/multer");
const sendResponse = require("../helpers/sendResponse");
const sendError = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");

const getAllBlogs = (req, res, next) => {
  BlogSchema.find(req.query)
    .then((data) => {
      if (data)
        res.status(200).json({
          message: "All Blogs",
          data: data,
        });
    })
    .catch((err) => {
      console.log(err);
      res.send(err);
    });
};

const createBlog = (req, res, next, pathName, linksArray) => {
  let newBlog = new BlogSchema({
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    links: linksArray,
    imageUrl: pathName,
  });
  newBlog
    .save()
    .then((data) => {
      // res.status(200).json({
      //   message: "Successful",
      //   data: data,
      // });
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAllBlogs,
  createBlog,
};
