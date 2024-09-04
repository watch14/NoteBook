import Notebook from "../models/Notebook.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";

// Create notebook
export const createNotebook = async (req, res, next) => {
  try {
    const { title, userId } = req.body;

    if (!title || !userId) {
      return next(CreateError(400, "title nad userId are required!"));
    }

    const notebook = new Notebook({
      title: req.body.title,
      userId: req.body.userId,
    });

    await notebook.save();
    return next(CreateSuccess(200, "Notebook created successfully!", notebook));
  } catch (err) {
    return next(
      CreateError(500, "Internal server error for creating a notebook!")
    );
  }
};
