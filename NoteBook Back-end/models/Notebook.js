import mongoose from "mongoose";

const { Schema } = mongoose;

const NotebookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    theme: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Notebook", NotebookSchema);
