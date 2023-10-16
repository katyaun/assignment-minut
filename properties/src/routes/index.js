import * as express from "express";
import propertiesRouter from "./properties.js";

const propertiesRoutes = express.Router();

propertiesRoutes.use("/v1", propertiesRouter);

export default propertiesRoutes;
