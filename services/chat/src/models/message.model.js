import mongoose from "mongoose";
import { Schema } from "mongoose";

const { ObjectId } = Schema.Types;

const Message = new Schema(
  {
    conversation: {
      type: ObjectId,
      required: true,
      ref: "Conversation",
    },
    sender: {
      type: ObjectId,
      required: true,
    },
    reciever: {
      type: ObjectId,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

Message.index({ conversation: 1 });

export const MessageModel = mongoose.model("Message", Message);
