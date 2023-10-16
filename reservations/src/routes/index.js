import * as express from "express";
import reservationRouter from "./reservation.js";

const reservationsRoutes = express.Router();

reservationsRoutes.use("/v1", reservationRouter);

export default reservationsRoutes;
