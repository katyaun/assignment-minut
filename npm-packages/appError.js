class AppError extends Error {
  static errorMapping = {
    4001: {
      status: 400,
      message: "User with this email already exists",
    },
    4000: {
      status: 400,
      message: "Missing email or password",
    },
    4003: {
      status: 400,
      message: "Email is not registered",
    },
    4004: {
      status: 400,
      message: "Wrong passord",
    },
    3021: {
      status: 400,
    },
    4034: {
      status: 401,
      message: "Unauthorized",
    },
    6325: {
      status: 400,
      message: "Cancel upcoming reservations manually before deleting property",
    },
    4009: {
      status: 409,
      message: "Chosen dates are unavailable",
    },
    4004: {
      status: 404,
      message: "Not found",
    },
  };

  constructor({ code, statusCode, params, message }) {
    super();
    this.code = code;
    this.statusCode = AppError.errorMapping[statusCode]?.status || 500;
    this.params = params;
    this.message =
      AppError.errorMapping[statusCode]?.message ||
      message ||
      "Smth went wrong";
  }
}

export default AppError;
