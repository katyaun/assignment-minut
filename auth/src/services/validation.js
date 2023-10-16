import validator from "validator";
import AppError from "../../../npm-packages/appError.js";

class ValidationService {
  validationMap = {};
  validate(value) {
    const errorMessages = [];
    let isValid = true;
    for (const rule in this.validationMap) {
      const { message, callback } = this.validationMap[rule];
      if (!callback(value)) {
        isValid = false;
        errorMessages.push(message);
      }
    }
    if (!isValid) {
      throw new AppError({ statusCode: '3021', message: errorMessages });
    }
    return isValid;
  }

  sanitizeInput(input) {
    return validator.escape(input);
  }
}

export default ValidationService;
