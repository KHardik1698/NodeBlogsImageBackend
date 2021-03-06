const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const uniqid = require("uniqid");
const BlogSchema = require("../models/blogModel");
const upload = require("../helpers/multer");
const sendResponse = require("../helpers/sendResponse");
const sendError = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");

const getAllBlogs = (req, res, next) => {
  let select = "";
  if (req.query.select) {
    req.query.select.split(" ").forEach((query) => {
      if (!query.includes("__v")) {
        select = select + query + " ";
      }
    });
  } else select = "-__v";
  if (select.length == 0) select = "-__v";
  delete req.query.select;
  BlogSchema.find(req.query)
    .select(`${select} -_id`)
    .then((data) => {
      if (data.length !== 0)
        sendResponse(200, "Request for getting the Blogs Data was Successful.", data, req, res);
      else
        sendError(
          new AppError(404, "Request was Unsuccessful.", "Blogs Data not found."),
          req,
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(new AppError(500, "Request was Unsuccessful.", "Internal Error."), req, res);
    });
  req.query.select = select;
};

const getBlogById = (req, res, next) => {
  BlogSchema.findOne({ blogId: req.params.id })
    .select("-_id -__v")
    .then((data) => {
      if (data)
        sendResponse(
          200,
          `Request for getting the Blog with Id ${req.params.id} was Successful.`,
          data,
          req,
          res
        );
      else
        sendError(
          new AppError(
            404,
            "Request was Unsuccessful.",
            `Blog with Id ${req.params.id} does not exist.`
          ),
          req,
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(new AppError(500, "Request was Unsuccessful.", "Internal Error."), req, res);
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
    blogId: "blog-" + uniqid(),
    author: req.body.author,
    title: req.body.title,
    content: req.body.content,
    links: linksArray,
    imageUrl: pathName,
  });
  newBlog
    .save()
    .then((data) => {
      if (data.length !== 0) {
        data = data.toObject();
        delete data._id;
        delete data.__v;
        sendResponse(
          200,
          "Request for creating a New Blog was Successful. New Blog Created.",
          data,
          req,
          res
        );
      } else
        sendErrorMessage(new AppError(404, "Unsuccessful.", "New Blog was not Created."), req, res);
    })
    .catch((err) => {
      console.log(err);
      sendError(new AppError(500, "Request was Unsuccessful.", "Internal Error."), req, res);
    });
};

const deleteBlogById = (req, res, next) => {
  BlogSchema.findByIdAndDelete(req.params.id)
    .then((data) => {
      if (data) {
        fs.unlinkSync(data.imageUrl);
        sendResponse(
          200,
          `Request for deleting the Blog with Id ${req.params.id} was Successful. Blog Deleted.`,
          data,
          req,
          res
        );
      } else
        sendError(
          new AppError(
            404,
            "Request was Unsuccessful.",
            `Blog with Id ${req.params.id} does not exist.`
          ),
          req,
          res
        );
    })
    .catch((err) => {
      console.log(err);
      sendError(new AppError(500, "Request was Unsuccessful.", "Internal Error."), req, res);
    });
};

module.exports = {
  getAllBlogs,
  getBlogById,
  createBlog,
  deleteBlogById,
};
