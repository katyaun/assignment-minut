import mongoose from "mongoose";
import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const Conversation = new Schema(
  {
    users: {
      type: [ObjectId],
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Conversation.index({ users: 1 });

export const ConversationModel = mongoose.model("Conversation", Conversation);
