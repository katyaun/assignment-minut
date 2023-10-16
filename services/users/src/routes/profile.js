import express from "express";

import ProfileController from "../controllers/profile.controller.js";
import { ProfileModel } from "../models/profile.model.js";
import ProfileRepository from "../repositories/profile.repository.js";
import { asyncHandler } from "../../../../../assignment-minut/middlewares/asyncHandler.js";
import TokenService from "../services/token.js";
import { roles } from "../consts.js";
import AppError from "../../../../../assignment-minut/npm-packages/appError.js";
import { handleRes } from "../../../../../assignment-minut/utils/httpResHandler.js";

const router = express.Router();

const profileRepository = new ProfileRepository(ProfileModel);
const profileController = new ProfileController(profileRepository);

router.post(
  "/",
  TokenService.validateToken,
  asyncHandler(async (req, response, next) => {
    const res = await profileController.createProfile(req.body);
    return handleRes({ response, data: res });
  }),
);

router.get(
  "/:profileId",
  TokenService.validateToken,
  async (req, response, next) => {
    try {
      const { profileId } = req.params;
      const role = getRole({ userId: req.usersId, profileId });
      const res = await profileController.getProfileById({
        id: profileId,
        role,
      });
      return handleRes({ response, data: res });
    } catch (e) {
      next(e);
    }
  },
);

router.put(
  "/:profileId",
  TokenService.validateToken,
  asyncHandler(async (req, res, next) => {
    const { profileId } = req.params;
    const role = getRole({ userId: req.usersId, profileId });
    if (role !== roles.PROFILE_OWNER) {
      throw new AppError({ statusCode: "4034" });
    }
    const profile = await profileController.updateProfile({
      id: profileId,
      data: req.body,
      role,
    });
    return handleRes({ response: res, data: profile });
  }),
);

// router.delete("/:profileId", TokenService.validateToken, async (req, response, next) => {
//   try {
//     const { profileId } = req.params;
//     await profileController.deleteProfile(profileId);
//     return handleRes({ response, data: { success: true } });
//   } catch (e) {
//     next(e);
//   }
// });

export default router;
