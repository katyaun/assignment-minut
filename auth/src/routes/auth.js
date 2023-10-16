import express from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler.js";
import { handleRes } from "../../../../auth/src/utils/handleRes";
import UserRepository from "../repository/users.repository.js";
import UsersController from "../controllers/users.controller.js";
import { UserModel } from "../models/user.model.js";

const router = express.Router();

const userRepository = new UserRepository(UserModel);
const userController = new UsersController(userRepository);

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    return handleRes({ response: res, data: res });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    return handleRes({ response: res, data: res });
  })
);

export default router;
