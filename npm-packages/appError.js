class AppError extends Error {
  errorMapping = {
    '4001': {
      status: 401,
      message: 'User with this email already exists',
    },
    '4000': {
      status: 400,
      message: 'Missing email or password',
    }
  }
  constructor({ code, statusCode, params }) {
    super();
    this.code = code;
    this.statusCode = errorMapping[statusCode].status || 500;
    this.params = params;
    this.message = errorMapping[statusCode].message || 'Smth went wrong';
  }
}

export default AppError;
