const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blogRoute = require("./routes/blogRoutes");

app.use("/blogs", blogRoute);

app.listen(process.env.PORT, () => {
  console.log(`Server has started at PORT ${process.env.PORT}`);
});
