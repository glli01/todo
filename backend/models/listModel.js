import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
