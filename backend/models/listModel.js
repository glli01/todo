import mongoose from "mongoose";

const listSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectID,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      required: true,
      default: "purple",
    },
  },
  {
    timestamps: true,
  }
);

const List = mongoose.model("List", listSchema);
export default List;
