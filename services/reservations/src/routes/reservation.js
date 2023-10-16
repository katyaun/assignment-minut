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
  reservationsRepository
);

router.post(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const reservation = await reservationsController.createReservation(req.body);
    return handleRes({ response: res, data: reservation });
  })
);

router.get(
  "/:reservationId",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { reservationId } = req.params;
    const { role } = req.query;
    const reservation = await reservationsController.getReservationById({
      id: reservationId,
      role,
    });
    return handleRes({ response: res, data: reservation });
  })
);

router.get(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { role, statuses, date } = req.query;
    const reservations = await reservationsController.getReservations({
      data: { statuses, date },
      role,
    });
    return handleRes({ response: res, data: reservations });
  })
);

export default router;
