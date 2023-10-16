import { roles } from "../consts.js";

class ProfileDto {
  constructor({ profile, role }) {
    this.profile = profile;

    const commonInfo = {
      name: profile.name,
    };

    switch (role) {
      case roles.PROFILE_OWNER: {
        return this.profile;
      }
      case roles.VISITOR: {
        return {
          ...commonInfo,
          picture: profile.picture,
        };
      }
      default: {
        return commonInfo;
      }
    }
  }
}

export default ProfileDto;
