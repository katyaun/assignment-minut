import AppError from "../../../../../assignment-minut/npm-packages/appError.js";
import ProfileDto from "../dto/profile.dto.js";

class ProfileController {
  constructor(repository) {
    this.repository = repository;
  }

  async createProfile(data) {
    if (data.id) {
      const existingProfile = await this.repository.getProfileById(data.id);
      if (existingProfile) {
        return existingProfile;
      }
    }
    // validate(data);
    await this.repository.createProfile(data);
    return { success: true };
  }

  async getProfileById({ id, role }) {
    const profile = await this.repository.getProfileById(id);
    if (profile) {
      return new ProfileDto({ profile, role });
    } else {
      throw new AppError({ statusCode: 4004 });
    }
  }

  // async deleteProfile({ id }) {
  //   return this.repository.deleteProfile(id);
  // }

  async updateProfile({ id, data }) {
    return this.repository.updateProfile({ id, data });
  }
}

export default ProfileController;
