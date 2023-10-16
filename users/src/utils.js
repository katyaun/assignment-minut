import { roles } from "./consts";

export const getRole = ({ userId, propertyId }) => {
  if (userId === propertyId) {
    return roles.PROFILE_OWNER;
  } else {
    return roles.VISITOR;
  }
};
