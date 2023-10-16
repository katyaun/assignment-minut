import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_CONNECTION,
    usersDb: process.env.USERS_DB,
  },
};
