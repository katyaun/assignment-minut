import AppError from "../../../npm-packages/appError";

class UsersController {
  constructor(repository) {
    this.repository = repository;
  }

  async signup(data) {
    const { email, password, userName, phone } = data;
    const existingUser = await this.userRepository.getUserByEmail({ email });

    if (existingUser) {
      throw new AppError({
        statusCode: 4001,
      });
    }

    return this.userRepository.createUser({
      email,
      password: await EncryptionService.hashPassword(password),
    });
  }

  async login({ email, password }) {
    if (!email || !password) {
      throw new AppError({ statusCode: 4000 });
    }

    const user = await this.userRepository.getUserByEmail({ email });

    if (!user) {
      throw new AppError({
        statusCode: 4001,
      });
    }
  }

  async getUserById(userId) {
    return this.userRepository.getUserById(userId);
  }
}

export default UsersController;
