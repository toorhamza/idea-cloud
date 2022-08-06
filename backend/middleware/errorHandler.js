const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  response.status(400).json(JSON.stringify(error.message)).end();
  next(error);
};

module.exports = errorHandler;
