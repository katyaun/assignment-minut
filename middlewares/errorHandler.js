import AppError from "../npm-packages/appError.js";

const errorHandler = (error, req, res, next) => {
  if (error instanceof AppError) {
    return res.status(error.statusCode).json({
      errorCode: error.errorCode,
      params: error.params,
      message: error.message,
    });
  }

  return res.status(500).send(error.message);
};

export default errorHandler;
