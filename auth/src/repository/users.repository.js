class UserRepository {
  constructor(db) {
    this.db = db;
  }
  async createUser({ password, email }) {
    return this.db.create({
      password,
      email,
    });
  }

  async getUserByEmail({ email }) {
    return this.db.findOne({ email });
  }

  async getUserById({ userId }) {
    return this.db.findOne({ _id: userId });
  }
}

export default UserRepository;
