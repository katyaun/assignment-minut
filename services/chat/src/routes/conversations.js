import express from "express";

import ConversationsController from "../controllers/conversations.controller.js";
import { ConversationModel } from "../models/conversation.model.js";
import ConversationsRepository from "../repositories/conversations.repository.js";
import { handleRes } from "../../../../utils/httpResHandler.js";

const router = express.Router();

const conversationsRepository = new ConversationsRepository(ConversationModel);
const conversationsController = new ConversationsController(
  conversationsRepository,
);

router.post("/", async (req, response, next) => {
  try {
    const res = await conversationsController.createConversation(req.body);
    return handleRes({ response, data: res });
  } catch (e) {
    next(e);
  }
});

router.get("/:userId", async (req, response, next) => {
  try {
    const { userId } = req.params;
    const res = await conversationsController.getUserConversations({
      id: userId,
    });
    return handleRes({ response, data: res });
  } catch (e) {
    next(e);
  }
});

router.get("/:conversationId", async (req, response, next) => {
  try {
    const { conversationId } = req.params;
    const { role } = req.query;
    // const res = await conversationsController.({ id: reservationId, role });
    return handleRes({ response, data: res });
  } catch (e) {
    next(e);
  }
});

export default router;
