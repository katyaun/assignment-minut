class AppError extends Error {
  constructor({ code, message, statusCode, params }) {
    super();
    this.code = code;
    this.statusCode = statusCode;
    this.params = params;
    this.message = message;
  }
}

export default AppError;
