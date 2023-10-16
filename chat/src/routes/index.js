import * as express from "express";
import conversationsRoute from "./conversations.js";
import messagesRoute from "./messages.js";

const messagesRouter = express.Router();

messagesRouter.use("/v1/conversations", conversationsRoute);
messagesRouter.use("/v1/messages", messagesRoute);

export default messagesRouter;
