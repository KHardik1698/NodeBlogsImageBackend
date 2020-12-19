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
        sendResponse(
          200,
          "Request for getting all the Blogs was Successful.",
          data,
          res
        );
      else
        sendError(
          new AppError(
            404,
            "Request was Unsuccessful.",
            "Blogs are not present."
          ),
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(
        new AppError(500, "Request was Unsuccessful.", "Internal Error."),
        res
      );
    });
};

const getBlogById = (req, res, next) => {
  BlogSchema.findById(req.params.id)
    .then((data) => {
      if (data)
        sendResponse(
          200,
          `Request for getting the Blog with Id ${req.params.id} was Successful.`,
          data,
          res
        );
      else
        sendError(
          new AppError(
            404,
            "Request was Unsuccessful.",
            `Blog with Id ${req.params.id} does not exist.`
          ),
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(
        new AppError(500, "Request was Unsuccessful.", "Internal Error."),
        res
      );
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
      sendResponse(
        200,
        "Request for creating a New Blog was Successful. Blog Created.",
        data,
        res
      );
    })
    .catch((err) => {
      console.log(err);
      sendError(
        new AppError(500, "Request was Unsuccessful.", "Internal Error."),
        res
      );
    });
};

const deleteBlogById = (req, res, next) => {
  BlogSchema.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        fs.unlinkSync(data.imageUrl);
        sendResponse(
          200,
          `Request for deleting the Blog with Id ${req.params.id} was Successful. Blog Deleted`,
          data,
          res
        );
      } else
        sendError(
          new AppError(
            404,
            "Request was Unsuccessful.",
            `Blog with Id ${req.params.id} does not exist.`
          ),
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(
        new AppError(500, "Request was Unsuccessful.", "Internal Error."),
        res
      );
    });
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
};
