import mongoose from "mongoose";
const passwordSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectID,
    required: true,
    ref: "User",
  },
  password: {
    type: String,
    required: true,
  },
});

const Password = mongoose.model("Password", passwordSchema);
export default Password;
