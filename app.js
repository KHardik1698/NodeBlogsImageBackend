const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const blogRoute = require("./routes/blogRoutes");

app.use(express.json());
app.use("/blogs", blogRoute);

mongoose.connect(
  process.env.DATABASE_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err, connection) => {
    if (err) {
      return console.log("Error in connecting to the Database. Express Server not Started.");
    }
    console.log("Connection to the Database was Successful.");
    app.listen(process.env.PORT, console.log(`Server has started at PORT ${process.env.PORT}`));
  }
);
