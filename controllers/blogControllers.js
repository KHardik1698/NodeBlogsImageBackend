const fs = require("fs");
const path = require("path");
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
  // sendResponse(
  //   200,
  //   "Request for getting all the Blogs was Successful.",
  //   data,
  //   res
  // );
  // sendError(
  //   new AppError(
  //     404,
  //     "Request was Unsuccessful",
  //     `Blog with Id ${req.params.id} does not exist.`
  //   ),
  //   res
  // );
};

const getBlogById = (req, res, next) => {
  BlogSchema.findById(req.params.id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createBlog = (req, res, next) => {
  let pathName = " ";
  let linksArray = [];
  req.body.links.split(",").forEach((link) => {
    linksArray.push(link.trim());
  });
  if (req.file) {
    pathName = path.join(__dirname, "..", req.file.path);
  }
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
      console.log(data);
      res.status(200).json({
        message: "Blog Added",
        data: data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const deleteBlogById = (req, res, next) => {
  BlogSchema.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        fs.unlinkSync(data.imageUrl);
        res.send(data);
      } else res.send("No Blog");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
};
