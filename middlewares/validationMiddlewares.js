const sendErrorMessage = require("../helpers/sendError");
const AppError = require("../helpers/appErrorClass");

const verifyRequestBody = (req, res, next) => {
  const requiredProperties = ["author", "title", "content", "links"];
  //   let result = Object.keys(req.body).every((key) => {
  //     return requiredProperties.includes(key);
  //   });
  let result = requiredProperties.every((key) => {
    return req.body[key];
  });
  if (!result) {
    sendErrorMessage(
      new AppError(400, "Unsuccessful", "Request Body is not valid"),
      res
    );
  } else {
    next();
  }
};

module.exports = verifyRequestBody;
