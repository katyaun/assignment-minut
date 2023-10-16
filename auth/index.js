import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";

import errorHandler from "./src/middlewares/errorHandler.js";
import { config } from "./config.js";

const app = express();

app.use(bodyParser.json());
app.use(helmet());

const startApp = async () => {
  try {
    app.listen(config.port, () => {
      console.log(`Server is running on port ${config.port}`);
    });
  } catch (e) {
    console.log("e", e);
  }
};

app.use(errorHandler);

startApp();
