import mongoose from "mongoose";

const { Schema } = mongoose;

const UserSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true, // Ensure unique usernames
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure unique emails
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("User", UserSchema);
