import Page from "../models/Page.js";
import { CreateSuccess } from "../utils/success.js";
import { CreateError } from "../utils/error.js";
import Notebook from "../models/Notebook.js";
import { decodeToken } from "../utils/auth.js";

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
    console.log(err);
    return next(
      CreateError(500, "Internal Server Error for fetching all Pages!")
    );
  }
};

// Update page
export const updatePage = async (req, res, next) => {
  try {
    console.log("aaaaaaaaaa");

    const pageId = req.params.id;
    const userId = decodeToken(req.headers.authorization).id;
    console.log(userId);
    // Find the page
    const page = await Page.findById(pageId).populate("notebookId"); // Populate to get notebook data
    if (!page) {
      return next(CreateError(404, "Page Not Found!"));
    }

    const notebook = await Notebook.findById(page.notebookId);
    if (!notebook) {
      return next(CreateError(404, "Page Not Found!"));
    }

    // Check if the user owns the notebook
    if (notebook.userId.toString() !== userId) {
      return next(
        CreateError(403, "You are not authorized to update this page.")
      );
    }

    console.log(notebook);

    // Update the page if authorized
    const updatedPage = await Page.findByIdAndUpdate(
      pageId,
      { $set: req.body },
      { new: true }
    );

    return next(CreateSuccess(200, "Page Updated!", updatedPage));
  } catch (err) {
    console.log(err);

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

    // decrement the order of the pages after the deleted notebook
    const pages = await Page.find({ notebookId: page.notebookId });
    pages.forEach(async (page, index) => {
      await Page.findByIdAndUpdate(page._id, { $set: { order: index + 1 } });
    });

    return next(CreateSuccess(200, "Page Deleted!"));
  } catch (err) {
    console.log(err);
    return next(CreateError(500, "Internal Server Error for deleting a Page!"));
  }
};

// Get pages by notebook ID
export const getPagesByNotebookId = async (req, res, next) => {
  try {
    const notebookId = req.params.id;
    const pages = await Page.find({ notebookId: notebookId });
    if (!pages.length) {
      return next(CreateError(404, "This notebook has no pages!"));
    }
    if (!pages) {
      return next(CreateError(404, "Pages Not Found!"));
    }
    return next(CreateSuccess(200, "Pages fetched successfully", pages));
  } catch (err) {
    return next(CreateError(500, "Internal Server Error for fetching Pages!"));
  }
};
