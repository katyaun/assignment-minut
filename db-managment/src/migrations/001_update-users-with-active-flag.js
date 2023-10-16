import { createConnection, dbName } from "../config/connection.js";

export async function up() {
  const usersDb = await createConnection(dbName.users);
  const usersCollection = await usersDb.collection("users");
  const res = await usersCollection.updateMany(
    {},
    { $set: { isActive: true } },
  );
  console.log(`Successfully updated ${res.modifiedCount} documents`);
}

export async function down() {
  const usersDb = await createConnection(dbName.users);
  const usersCollection = await usersDb.collection("users");
  const res = await usersCollection.updateMany(
    { isActive: { $exists: true } },
    { $unset: { isActive } },
  );
  console.log(`Successfully updated ${res.modifiedCount} documents`);
}
