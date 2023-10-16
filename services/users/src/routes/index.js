import * as express from "express";
import profileRouter from "./profile.js";

const usersRoutes = express.Router();

usersRoutes.use("/v1/profiles", profileRouter);

export default usersRoutes;
