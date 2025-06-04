const { CustomAPIError } = require('../errors');
const { StatusCodes } = require('http-status-codes');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }

  console.error(err); 
  const response = process.env.NODE_ENV === 'production'
    ? { msg: 'Something went wrong, please try again later.' }
    : { msg: err.message, stack: err.stack };

  return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
};

module.exports = errorHandlerMiddleware;

