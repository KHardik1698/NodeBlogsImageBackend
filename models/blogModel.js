const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  blogId: {
    type: String,
  },
  author: {
    type: String,
    validate: {
      validator: function (author) {
        return this.author.trim().length !== 0;
      },
      message: "Author Name should not be an Empty String.",
    },
  },
  title: {
    type: String,
    validate: {
      validator: function (title) {
        return this.title.trim().length !== 0;
      },
      message: "Blog Title should not be an Empty String.",
    },
  },
  content: {
    type: String,
    validate: {
      validator: function (content) {
        return this.content.trim().length !== 0;
      },
      message: "Blog Content should not be an Empty String.",
    },
  },
  links: {
    type: Array,
    default: [],
  },
  imageUrl: {
    type: String,
    validate: {
      validator: function (imageUrl) {
        return this.imageUrl.trim().length !== 0;
      },
      message: "Image was not uploaded.",
    },
  },
});

const BlogSchema = mongoose.model("Blog", blogSchema);

module.exports = BlogSchema;
