import express from "express";

import { MessageModel } from "../models/message.model.js";
import MessagesRepository from "../repositories/messages.repository.js";
import MessagesController from "../controllers/messages.controller.js";
import { handleRes } from "../../../utils/httpResHandler.js";

const router = express.Router();

const messagesRepository = new MessagesRepository(MessageModel);
const messagesController = new MessagesController(messagesRepository);

router.post("/", async (req, response, next) => {
  try {
    const res = await conversationsController.createConversation(req.body);
    return handleRes({ response, data: res });
  } catch (e) {
    next(e);
  }
});

router.get("/:conversationId", async (req, response, next) => {
  try {
    const { conversationId } = req.params;
    const { cursor } = req.query;
    const res = await messagesController.getMessagesByConversationId({
      id: conversationId,
      filter: { cursor },
    });
    return handleRes({ response, data: res });
  } catch (e) {
    next(e);
  }
});

export default router;
