import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import profileRoutes from "./src/routes/index.js";
import { mongoClient } from "./src/db/index.js";
import { config } from "./config.js";
import errorHandler from "../../../assignment-minut/middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use("/api/users", profileRoutes);

const startApp = async () => {
  try {
    await mongoClient.connectToCluster(
      `${config.mongo.host}/${config.mongo.usersDb}`,
    );
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (e) {
    console.log("e", e);
  }
};

app.use(errorHandler);

startApp();
