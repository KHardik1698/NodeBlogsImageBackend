const express = require("express");
const blogRoute = express.Router();

blogRoute.route("/").get().post();

blogRoute.route("/:id").get().delete();

module.exports = blogRoute;
