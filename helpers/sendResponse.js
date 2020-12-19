const sendResponse = (statusCode, message, blogData, req, res) => {
  res.status(statusCode).json({
    message: message,
    blogData: blogData,
  });
};

module.exports = sendResponse;
