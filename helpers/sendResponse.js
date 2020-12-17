const sendResponse = (statusCode, message, blogData, res) => {
  res.status(statusCode).json({
    message: message,
    blogData: blogData,
  });
};

module.exports = sendResponse;
