import express from "express";

import PropertiesController from "../controllers/properties.cotroller.js";
import { ProfileModel } from "../models/properties.model.js";
import PropertiesRepository from "../repositories/properties.repository.js";
import TokenService from "../services/token.js";
import { handleRes } from "../../../../../assignment-minut/utils/httpResHandler.js";
import { asyncHandler } from "../../../../../assignment-minut/middlewares/asyncHandler.js";

const router = express.Router();

const propertiesRepository = new PropertiesRepository(ProfileModel);
const propertiesController = new PropertiesController(propertiesRepository);

router.post(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const property = await propertiesController.createProperty(req.body);
    return handleRes({ response: res, data: property });
  }),
);

router.get(
  "/:propertyId",
  asyncHandler(async (req, res, next) => {
    const { propertyId } = req.params;
    const proprty = await propertiesController.getPropertyById({
      id: propertyId,
      role: req.query.role,
    });
    return handleRes({ response: res, data: proprty });
  }),
);

router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const { role, poi, filters } = req.query;
    const properties = await propertiesController.getProperties({
      data: { poi, filters, limit, skip },
      role,
    });
    return handleRes({ response: res, data: properties });
  }),
);

router.put(
  "/:propertyId",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { propertyId } = req.params;
    const updatedProperty = await propertiesController.updateProperty({
      id: propertyId,
      data: req.body,
    });
    return handleRes({ response: res, data: updatedProperty });
  }),
);

router.delete(
  "/:propertyId",
  TokenService.validateToken,
  asyncHandler(async (req, response, next) => {
    const { propertyId } = req.params;
    await propertiesController.deleteProperty(propertyId);
    return handleRes({ response, data: { success: true } });
  }),
);

export default router;
