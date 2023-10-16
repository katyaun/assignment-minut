import dotenv from "dotenv";

dotenv.config();

export const config = {
  port: process.env.PORT,
  mongo: {
    host: process.env.MONGO_CONNECTION,
    propertiesDb: process.env.PROPERTIES_DB,
  },
  jwtKey: process.env.JWT_KEY,
  reservationsUrl: process.env.RESERVATION_URL,
};
