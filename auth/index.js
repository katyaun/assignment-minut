import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import { config } from "./config.js";
import { mongoClient } from "../db/index.js";
import errorHandler from "../middlewares/errorHandler.js";

const app = express();

app.use(bodyParser.json());
app.use(helmet());

const startApp = async () => {
  try {
    await mongoClient.connectToCluster(
      `${config.mongo.host}/${config.mongo.authDB}`,
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
