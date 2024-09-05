import mongoose from "mongoose";

const { Schema } = mongoose;

const PageSchema = new Schema(
  {
    order: {
      type: Number,
      required: true,
      default: 0,
    },
    text: {
      type: String,
      required: false,
    },
    sketch: {
      type: String,
      required: false,
    },
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

PageSchema.pre("save", async function (next) {
  const page = this;

  if (page.isNew) {
    const lastPage = await mongoose
      .model("Page")
      .findOne({ notebookId: page.notebookId })
      .sort({ order: -1 });

    if (lastPage) {
      page.order = lastPage.order + 1;
    } else {
      page.order = 1;
    }
  }

  next();
});

export default mongoose.model("Page", PageSchema);
