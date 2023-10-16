import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_CONNECTION,
    authDB: process.env.AUTH_DB,
  },
  jwtKey: process.env.JWT_KEY,
  usersUrl: process.env.USERS_REMOTE_URL,
};
