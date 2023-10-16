import { Schema } from "mongoose";
import mongoose from "mongoose";

const Profile = new Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    // shard profile collection by regions to improve read performance
    //   shardKey: {
    //     region: 1,
    //   },
  },
  {
    timestamps: true,
  },
);

Profile.index({ email: 1 }, { unique: true });

export const ProfileModel = mongoose.model("Profile", Profile);
