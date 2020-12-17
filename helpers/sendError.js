const sendError = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    message: error.message,
  });
};

module.exports = sendError;
