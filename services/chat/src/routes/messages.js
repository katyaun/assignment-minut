import express from "express";

import { MessageModel } from "../models/message.model.js";
import MessagesRepository from "../repositories/messages.repository.js";
import MessagesController from "../controllers/messages.controller.js";
import { handleRes } from "../../../../utils/httpResHandler.js";
import { asyncHandler } from "../../../../middlewares/asyncHandler.js";

const router = express.Router();

const messagesRepository = new MessagesRepository(MessageModel);
const messagesController = new MessagesController(messagesRepository);

router.post(
  "/",
  asyncHandler(async (req, response, next) => {
    const res = await messagesController.addMessage(req.body);
    return handleRes({ response, data: res });
  })
);

router.get(
  "/:conversationId",
  asyncHandler(async (req, response, next) => {
    const { conversationId } = req.params;
    const { cursor, limit } = req.query;
    const res = await messagesController.getMessagesByConversationId({
      id: conversationId,
      filter: { cursor, limit },
    });
    return handleRes({ response, data: res });
  })
);

export default router;
