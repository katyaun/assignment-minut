import AppError from "../../../npm-packages/appError.js";
import { UsersRemoteService } from "../remote/users.remote.js";
import EncryptionService from "../services/encryption.js";
import PasswordValidation from "../services/passwordValidation.js";
import TokenService from "../services/token.js";

class UsersController {
  constructor(repository) {
    this.repository = repository;
  }

  async signup(data) {
    const { email, password, name, phone } = data;
    const existingUser = await this.repository.getUserByEmail({ email });

    if (existingUser) {
      throw new AppError({
        statusCode: 4001,
      });
    }

    await UsersRemoteService.createUser({ phone, email, name });
    const user = await this.repository.createUser({
      email,
      password: new PasswordValidation().validate(password),
    });
    return {
      success: true,
      token: TokenService.generateToken({ id: user._id, email: user.email }),
    };
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new AppError({ statusCode: 4000 });
    }
    const user = await this.repository.getUserByEmail({ email });

    if (!user) {
      throw new AppError({
        statusCode: 4003,
      });
    }
    if (!EncryptionService.comparePasswords(password, user.password)) {
      throw new AppError({ statusCode: 4004 });
    }

    return {
      success: true,
      token: TokenService.generateToken({ id: user.id, email: user.email }),
    };
  }

  async getUserById(userId) {
    return this.repository.getUserById(userId);
  }
}

export default UsersController;
