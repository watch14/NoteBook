import mongoose from "mongoose";

const { Schema } = mongoose;

const PageSchema = new Schema(
  {
    notebookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Notebook",
      required: true,
    },
    text: {
      type: String,
      required: false,
    },
    sketch: {
      type: String,
      required: false,
    },
    order: {
      type: Number,
      required: true,
      default: 0,
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
