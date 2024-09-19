import Notebook from "../models/Notebook.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import User from "../models/User.js";
import Page from "../models/Page.js"; // Ensure Page model is imported correctly

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
      theme: req.body.theme,
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

export const getAllNotebooks = async (req, res, next) => {
  try {
    const {
      title,
      limit = 10,
      skip = 0,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = req.query;

    // Convert limit and skip to integers
    const limitNumber = parseInt(limit, 10);
    const skipNumber = parseInt(skip, 10);

    // Determine sorting direction
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    // Construct filter object
    const filter = {};

    if (title) {
      filter.title = new RegExp(title, "i"); // Case-insensitive search
    }

    // Construct sort object
    const sort = {};
    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      sort[sortBy] = sortDirection;
    }

    // Fetch notebooks with filters, sorting, and pagination
    const notebooks = await Notebook.find(filter)
      .sort(sort)
      .limit(limitNumber)
      .skip(skipNumber);

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

// Delete notebook and its pages
export const deleteNotebook = async (req, res, next) => {
  try {
    const notebookId = req.params.id;

    // Find the notebook
    const notebook = await Notebook.findById(notebookId);
    if (!notebook) {
      return next(CreateError(404, "Notebook Not Found!"));
    }

    // Log the notebook that is being deleted
    console.log(`Deleting notebook: ${notebookId}`);

    // Find and delete all pages associated with the notebook
    const deletedPages = await Page.deleteMany({ notebookId: notebookId });
    console.log(`${deletedPages.deletedCount} pages deleted`);

    // Delete the notebook itself
    await Notebook.findByIdAndDelete(notebookId);
    console.log(`Notebook ${notebookId} deleted`);

    // Send success response
    return next(
      CreateSuccess(200, "Notebook and its pages deleted!", notebook)
    );
  } catch (err) {
    // Log the error for debugging
    console.error("Error during notebook deletion:", err);

    return next(
      CreateError(500, "Internal Server Error while deleting the notebook!")
    );
  }
};

// Get user notebooks
export const getUserNotebooks = async (req, res, next) => {
  try {
    const userId = req.params.id;
    const {
      title,
      limit = 10,
      skip = 0,
      sortBy = "createdAt",
      sortOrder = "asc",
    } = req.query;

    // Convert limit and skip to integers
    const limitNumber = parseInt(limit, 10);
    const skipNumber = parseInt(skip, 10);

    // Determine sorting direction
    const sortDirection = sortOrder === "desc" ? -1 : 1;

    // Construct filter object
    const filter = { userId };

    if (title) {
      filter.title = new RegExp(title, "i"); // Case-insensitive search
    }

    // Construct sort object
    const sort = {};
    if (sortBy === "createdAt" || sortBy === "updatedAt") {
      sort[sortBy] = sortDirection;
    }

    // Fetch notebooks with filters, sorting, and pagination
    const notebooks = await Notebook.find(filter)
      .sort(sort)
      .limit(limitNumber)
      .skip(skipNumber);

    const totalCount = await Notebook.countDocuments(filter);
    const notebooksData = {
      notebooks,
      totalCount,
    };

    // Check if the array is empty
    if (notebooks.length === 0) {
      return next(CreateSuccess(204, "No Notebooks Found!"));
    }

    return next(
      CreateSuccess(200, "Notebooks fetched successfully", notebooksData)
    );
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for fetching all Notebooks!")
    );
  }
};
