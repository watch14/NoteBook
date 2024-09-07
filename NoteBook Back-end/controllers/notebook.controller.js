import Notebook from "../models/Notebook.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import User from "../models/User.js";

// Create notebook
export const createNotebook = async (req, res, next) => {
  try {
    const { title, userId } = req.body;

    // Check if the user exists
    const user = await User.findById(userId);

    if (!user) {
      return next(CreateError(404, "User not found!"));
    }

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

// Get notebook by ID
export const getNotebookById = async (req, res, next) => {
  try {
    const notebookId = req.params.id;
    const notebook = await Notebook.findById(notebookId);
    if (!notebook) {
      return next(CreateError(404, "Notebook Not Found!"));
    }

    return next(CreateSuccess(200, "Notebook fetched successfully", notebook));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for fetching a Notebook!")
    );
  }
};

// Get all notebooks
export const getAllNotebooks = async (req, res, next) => {
  try {
    const notebooks = await Notebook.find();
    return next(
      CreateSuccess(200, "All notebooks fetched successfully", notebooks)
    );
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for fetching all Notebooks!")
    );
  }
};

// Update notebook
export const updateNotebook = async (req, res, next) => {
  try {
    const notebookId = req.params.id;
    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return next(CreateError(404, "Notebook Not Found!"));
    }

    const updatedNotebook = await Notebook.findByIdAndUpdate(
      notebookId,
      { $set: req.body },
      { new: true }
    );

    return next(CreateSuccess(200, "Notebook Updated!", updatedNotebook));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for Updating a Notebook!")
    );
  }
};

// Delete notebook
export const deleteNotebook = async (req, res, next) => {
  try {
    const notebookId = req.params.id;
    const notebook = await Notebook.findById(notebookId);
    if (!notebook) {
      return next(CreateError(404, "Notebook Not Found!"));
    }
    await Notebook.findByIdAndDelete(notebookId);

    return next(CreateSuccess(200, "Notebook Deleted!", notebook));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for Deleting a Notebook!")
    );
  }
};

// get user notebooks
// get user notebooks
export const getUserNotebooks = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const notebooks = await Notebook.find({ userId });

    // Check if the array is empty
    if (notebooks.length === 0) {
      return next(CreateError(404, "This user has no notebooks!"));
    }
    return next(
      CreateSuccess(200, "Notebooks fetched successfully", notebooks)
    );
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for fetching all Notebooks!")
    );
  }
};
