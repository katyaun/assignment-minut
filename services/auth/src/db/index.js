import mongoose from "mongoose";

export class MongoDBConnector {
  constructor(uri) {
    this.connection = null;
  }

  async connectToCluster(uri) {
    try {
      mongoose.connect(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      this.connection = mongoose.connection;
      console.log("Connected to MongoDB");
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error;
    }
  }
}

export const mongoClient = new MongoDBConnector();
