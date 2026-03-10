const errorHandler = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || 'Internal Server Error';

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const message = `Duplicate Field Value entered`;
    err.statusCode = 400;
    err.message = message;
  }

  // JWT expired error
  if (err.name === 'JsonWebTokenError') {
    const message = `Json Web Token is invalid, Try again`;
    err.statusCode = 400;
    err.message = message;
  }

  if (err.name === 'TokenExpiredError') {
    const message = `Json Web Token is Expired, Try again`;
    err.statusCode = 400;
    err.message = message;
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message
  });
};

module.exports = errorHandler;
