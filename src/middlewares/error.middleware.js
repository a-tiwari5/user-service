const { errorResponse } = require('../utils/response.util');

const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';

  errorResponse(res, message, statusCode, process.env.NODE_ENV === 'development' ? err : {});
};

module.exports = errorHandler;
