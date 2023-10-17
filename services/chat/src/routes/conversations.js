import express from "express";

import ConversationsController from "../controllers/conversations.controller.js";
import { ConversationModel } from "../models/conversation.model.js";
import ConversationsRepository from "../repositories/conversations.repository.js";
import { handleRes } from "../../../../utils/httpResHandler.js";
import { asyncHandler } from "../../../../middlewares/asyncHandler.js";

const router = express.Router();

const conversationsRepository = new ConversationsRepository(ConversationModel);
const conversationsController = new ConversationsController(
  conversationsRepository
);

router.post(
  "/",
  asyncHandler(async (req, response, next) => {
    const res = await conversationsController.createConversation(req.body);
    return handleRes({ response, data: res });
  })
);

router.get(
  "/:userId",
  asyncHandler(async (req, response, next) => {
    const { userId } = req.params;
    const res = await conversationsController.getUserConversations({
      id: userId,
    });
    return handleRes({ response, data: res });
  })
);

router.get(
  "/:conversationId",
  asyncHandler(async (req, response, next) => {
    const { conversationId } = req.params;
    const res = await conversationsController.getConversationById({
      id: conversationId,
    });
    return handleRes({ response, data: res });
  })
);

export default router;
