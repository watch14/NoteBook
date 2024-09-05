import Page from "../models/Page.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import Notebook from "../models/Notebook.js";

// Create page
export const createPage = async (req, res, next) => {
  try {
    const { text, sketch, notebookId } = req.body;

    // Check if the notebook exists
    const notebook = await Notebook.findById(notebookId);

    if (!notebook) {
      return next(CreateError(404, "Notebook Not Found!"));
    }

    const page = new Page({
      notebookId: req.body.notebookId,
      text: req.body.text,
      sketch: req.body.sketch,
    });

    await page.save();
    return next(CreateSuccess(200, "Page created successfully!", page));
  } catch (err) {
    return next(CreateError(500, "Internal server error for creating a page!"));
  }
};

// Get page by ID
export const getPageById = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);
    if (!page) {
      return next(CreateError(404, "Page Not Found!"));
    }
    return next(CreateSuccess(200, "Page fetched successfully", page));
  } catch (err) {
    return next(CreateError(500, "Internal Server Error for fetching a Page!"));
  }
};

// Get all pages
export const getAllPages = async (req, res, next) => {
  try {
    const pages = await Page.find();
    return next(CreateSuccess(200, "All pages fetched successfully", pages));
  } catch (err) {
    return next(
      CreateError(500, "Internal Server Error for fetching all Pages!")
    );
  }
};

// Update page
export const updatePage = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);
    if (!page) {
      return next(CreateError(404, "Page Not Found!"));
    }
    const updatedPage = await Page.findByIdAndUpdate(
      pageId,
      { $set: req.body },
      { new: true }
    );
    return next(CreateSuccess(200, "Page Updated!", updatedPage));
  } catch (err) {
    return next(CreateError(500, "Internal Server Error for updating a Page!"));
  }
};

// Delete page
export const deletePage = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);
    if (!page) {
      return next(CreateError(404, "Page Not Found!"));
    }
    await Page.findByIdAndDelete(pageId);
    return next(CreateSuccess(200, "Page Deleted!"));
  } catch (err) {
    return next(CreateError(500, "Internal Server Error for deleting a Page!"));
  }
};
