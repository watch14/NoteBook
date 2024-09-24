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
      console.log(
        `[${new Date().toISOString()}] ERROR: User with ID ${userId} not found.`
      );
      return next(CreateError(404, "User not found!"));
    }

    if (!title || !userId) {
      console.log(
        `[${new Date().toISOString()}] ERROR: title and userId are required.`
      );
      return next(CreateError(400, "title and userId are required!"));
    }

    const notebook = new Notebook({
      title,
      userId,
      theme: req.body.theme,
    });

    await notebook.save();
    console.log(
      `[${new Date().toISOString()}] INFO: Notebook created successfully with ID ${
        notebook._id
      }`
    );
    return next(CreateSuccess(200, "Notebook created successfully!", notebook));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal server error for creating a notebook! Details: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: Notebook with ID ${notebookId} not found.`
      );
      return next(CreateError(404, "Notebook Not Found!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Notebook fetched successfully with ID ${notebookId}`
    );
    return next(CreateSuccess(200, "Notebook fetched successfully", notebook));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching a Notebook! Details: ${
        err.message
      }`
    );
    return next(
      CreateError(500, "Internal Server Error for fetching a Notebook!")
    );
  }
};

// Get all notebooks
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

    console.log(
      `[${new Date().toISOString()}] INFO: All notebooks fetched successfully. Total notebooks: ${
        notebooks.length
      }`
    );
    return next(
      CreateSuccess(200, "All notebooks fetched successfully", notebooks)
    );
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching all Notebooks! Details: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: Notebook with ID ${notebookId} not found.`
      );
      return next(CreateError(404, "Notebook Not Found!"));
    }

    const updatedNotebook = await Notebook.findByIdAndUpdate(
      notebookId,
      { $set: req.body },
      { new: true }
    );

    console.log(
      `[${new Date().toISOString()}] INFO: Notebook with ID ${notebookId} updated successfully.`
    );
    return next(CreateSuccess(200, "Notebook Updated!", updatedNotebook));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for Updating a Notebook! Details: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] ERROR: Notebook with ID ${notebookId} not found.`
      );
      return next(CreateError(404, "Notebook Not Found!"));
    }

    // Find and delete all pages associated with the notebook
    const deletedPages = await Page.deleteMany({ notebookId: notebookId });
    console.log(
      `[${new Date().toISOString()}] INFO: Deleted ${
        deletedPages.deletedCount
      } pages associated with notebook ID ${notebookId}.`
    );

    // Delete the notebook itself
    await Notebook.findByIdAndDelete(notebookId);
    console.log(
      `[${new Date().toISOString()}] INFO: Notebook with ID ${notebookId} deleted successfully.`
    );

    // Send success response
    return next(
      CreateSuccess(200, "Notebook and its pages deleted!", notebook)
    );
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error while deleting the notebook! Details: ${
        err.message
      }`
    );
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
      console.log(
        `[${new Date().toISOString()}] INFO: No Notebooks Found for user ID ${userId}.`
      );
      return next(CreateSuccess(204, "No Notebooks Found!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Notebooks fetched successfully for user ID ${userId}. Total notebooks: ${
        notebooks.length
      }`
    );
    return next(
      CreateSuccess(200, "Notebooks fetched successfully", notebooksData)
    );
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching user Notebooks! Details: ${
        err.message
      }`
    );
    return next(
      CreateError(500, "Internal Server Error for fetching all Notebooks!")
    );
  }
};
