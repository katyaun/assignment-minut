import { Schema } from "mongoose";
import mongoose from "mongoose";

const Reservation = new Schema(
  {
    property: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
    },
    guest: {
      type: String,
      required: true,
    },
    checkin: {
      date: {
        type: Date,
        required: true,
      },
      timezone: {
        type: String,
        required: true,
      },
    },
    checkout: {
      date: {
        type: Date,
        required: true,
      },
      timezone: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

Reservation.index(
  { property: 1, status: 1, checkin: 1, checkout: 1 },
  { unique: true },
);

export const ReservationModel = mongoose.model("Reservation", Reservation);
