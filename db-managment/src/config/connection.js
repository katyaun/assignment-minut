import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

export const dbName = {
  reservation: "reservation",
  users: "users",
};

export const createConnection = async (db) => {
  const url = `${process.env.MONGO_CONNECTION}/${dbName[db]}`;
  const client = await MongoClient.connect(url);
  return client.db(dbName[db]);
};
