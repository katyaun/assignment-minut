import { Schema } from "mongoose";
import mongoose from "mongoose";
import validator from "../../../../../assignment-minut/npm-packages/validator.js";
import EncryptionService from "../services/encryption.js";

const User = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      validate: [validator.isEmail, "Please provide a valid email."],
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

User.pre("save", function (next) {
  if (!this.password) {
    return next();
  }
  this.password = EncryptionService.hashPassword(this.password);
  return next();
});

User.index({ email: 1 }, { unique: true });

export const UserModel = mongoose.model("users", User);
