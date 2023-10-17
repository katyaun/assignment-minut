import { roles } from "./consts";

export const getProfileRole = ({ userId, profileId }) => {
  if (userId === profileId) {
    return roles.PROFILE_OWNER;
  } else {
    return roles.VISITOR;
  }
};

export const getReservationRole = ({ userId, reservation }) => {
  if (userId === reservation.host) {
    return roles.HOST;
  }
  if (userId === reservation.guest) {
    return roles.GUEST;
  }
  return roles.VISITOR;
};
