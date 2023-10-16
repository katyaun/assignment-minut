import { Schema } from "mongoose";
import mongoose from "mongoose";
import validator from '../../../npm-packages/validator.js'

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, 'Please provide a valid email.'], // status?
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

User.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model("users", User);
