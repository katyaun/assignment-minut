import { Schema } from "mongoose";
import mongoose from "mongoose";

const Property = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    region: {
      type: String,
      required: true,
    },
    long: Number,
    lat: Number,
    ownerId: {
      type: String,
      required: true,
    },
    timezone: {
      type: String,
      required: true,
    },
    bookingSlots: [String],
    // shard profile collection by regions to improve performance
    // shardKey: {
    //   region: 1,
    // },
  },
  {
    timestamps: true,
  },
);

export const ProfileModel = mongoose.model("Property", Property);
