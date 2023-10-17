import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_CONNECTION,
    reservationsDb: process.env.RESERVATIONS_DB,
  },
  usersUrl: process.env.USERS_REMOTE_URL,
  propertiesUrl: process.env.PROPERTIES_URL,
  jwtKey: process.env.JWT_KEY,
};
