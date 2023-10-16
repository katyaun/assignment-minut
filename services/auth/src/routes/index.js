import * as express from "express";
import authRouter from "./auth.js";

const authRoutes = express.Router();

authRoutes.use("/v1", authRouter);

export default authRoutes;
