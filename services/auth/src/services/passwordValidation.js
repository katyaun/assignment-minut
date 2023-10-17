import ValidationService from "../../validation.js";

export class PasswordValidation extends ValidationService {
  MIN_LENGTH = 3;
  MAX_LENGTH = 20;
  SPECIAL_CHARACTER_REGEX = /[!@#$%^&*(),.?":{}|<>]/;

  validationMap = {
    required: {
      message: "Password is required",
      callback: (password) => !!password,
    },
    minLength: {
      message: `Password should be longer than ${this.MIN_LENGTH} symbols`,
      callback: (password) => password.length >= this.MIN_LENGTH,
    },
    maxLength: {
      message: "Password is too long",
      callback: (password) => password.length <= this.MAX_LENGTH,
    },
    requiresSpecialChar: {
      message: "Password must contain at least one special character",
      callback: (password) => this.SPECIAL_CHARACTER_REGEX.test(password),
    },
  };
}

export default PasswordValidation;
