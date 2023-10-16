import express from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler.js";
import UserRepository from "../repository/users.repository.js";
import UsersController from "../controllers/users.controller.js";
import { UserModel } from "../models/user.model.js";
import { handleRes, sendCookie } from "../../../utils/httpResHandler.js";

const router = express.Router();

const userRepository = new UserRepository(UserModel);
const userController = new UsersController(userRepository);

router.post(
  "/signup",
  asyncHandler(async (req, res) => {
    const signupRes = await userController.signup(req.body);
    sendCookie({ name: 'token', value: signupRes.token, response: res });
    handleRes({ response: res, data: { success: signupRes.success } });
  })
);

router.post(
  "/login",
  asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const loginRes = await userController.login({ email, password });
    sendCookie({ name: 'token', value: loginRes.token, response: res });
    handleRes({ response: res, data: { success: loginRes.success } });
  })
);

export default router;
