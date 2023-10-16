import bcrypt from "bcrypt";

class EncryptionService {
  static SALT = 12;

  static async hashPassword(password) {
    return bcrypt.hash(password, this.SALT);
  }

  static async comparePasswords(plainPassword, hashedPassword) {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}

export default EncryptionService;
