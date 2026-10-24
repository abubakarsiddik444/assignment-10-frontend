import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("MONGODB_URI is required to configure Better Auth.");
}

const client =
  globalThis.recipeHubMongoClient ||
  new MongoClient(uri);

if (process.env.NODE_ENV !== "production") {
  globalThis.recipeHubMongoClient = client;
}

export const authDatabase = client.db(process.env.DB_NAME || "recipehub");
