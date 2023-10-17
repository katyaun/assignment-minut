import express from "express";

import ReservationsController from "../controllers/reservations.controller.js";
import { ReservationModel } from "../models/reservations.model.js";
import ReservationsRepository from "../repositories/reservations.repository.js";
import { handleRes } from "../../../../../assignment-minut/utils/httpResHandler.js";
import TokenService from "../services/token.js";
import { asyncHandler } from "../../../../../assignment-minut/middlewares/asyncHandler.js";

const router = express.Router();

const reservationsRepository = new ReservationsRepository(ReservationModel);
const reservationsController = new ReservationsController(
  reservationsRepository,
);

router.post(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const reservation = await reservationsController.createReservation(
      req.body,
    );
    return handleRes({ response: res, data: reservation });
  }),
);

router.get(
  "/:reservationId",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { reservationId } = req.params;
    const reservation = await reservationsController.getReservationById({
      id: reservationId,
      userId: req.userId,
    });
    return handleRes({ response: res, data: reservation });
  }),
);

router.get(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { statuses, date } = req.query;
    const reservations = await reservationsController.getReservations({
      data: { statuses, date },
      userId: req.userId,
    });
    return handleRes({ response: res, data: reservations });
  }),
);

router.post(
  "/action",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { reservationId } = req.query;
    const { action } = req.body;
    const reservations = await reservationsController.doActionOnReservation({
      reservationId,
      action,
      userId: req.userId,
    });
    return handleRes({ response: res, data: reservations });
  }),
);

export default router;
