class ProfileRepository {
  constructor(db) {
    this.db = db;
  }

  async createProfile(data) {
    return this.db.create(data);
  }

  async getProfileById(profileId) {
    return this.db.findOne({ _id: profileId });
  }

  async getProfileBy({ filter }) {
    // create filter
    return this.db.findOne(filter);
  }

  async deleteProfile(id) {
    await this.db.deleteOne({ _id: id });
  }

  async updateProfile({ id, data }) {
    return this.db.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },
    );
  }
}

export default ProfileRepository;
