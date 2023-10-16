import express from "express";
import { asyncHandler } from "../../../middlewares/asyncHandler.js";
import { handleRes } from "../../../../auth/src/utils/handleRes";

const router = express.Router();

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
