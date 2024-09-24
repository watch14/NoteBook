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
      console.log(
        `[${new Date().toISOString()}] ERROR: Notebook with ID ${notebookId} not found.`
      );
      return next(CreateError(404, "Notebook Not Found!"));
    }

    const page = new Page({
      notebookId,
      text,
      sketch,
    });

    await page.save();
    console.log(
      `[${new Date().toISOString()}] INFO: Page created successfully with ID ${
        page._id
      }`
    );
    return next(CreateSuccess(200, "Page created successfully!", page));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal server error for creating a page! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal server error for creating a page!"));
  }
};

// Get page by ID
export const getPageById = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);

    if (!page) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Page with ID ${pageId} not found.`
      );
      return next(CreateError(404, "Page Not Found!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Page fetched successfully with ID ${pageId}`
    );
    return next(CreateSuccess(200, "Page fetched successfully", page));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching a Page! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal Server Error for fetching a Page!"));
  }
};

// Get all pages
export const getAllPages = async (req, res, next) => {
  try {
    const pages = await Page.find();
    console.log(
      `[${new Date().toISOString()}] INFO: Fetched all pages. Total pages: ${
        pages.length
      }`
    );
    return next(CreateSuccess(200, "All pages fetched successfully", pages));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching all Pages! Details: ${
        err.message
      }`
    );
    return next(
      CreateError(500, "Internal Server Error for fetching all Pages!")
    );
  }
};

// Update page
export const updatePage = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const userId = decodeToken(req.headers.authorization).id;

    console.log(
      `[${new Date().toISOString()}] INFO: Updating page with ID ${pageId} for user ${userId}`
    );

    // Find the page
    const page = await Page.findById(pageId).populate("notebookId");
    if (!page) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Page with ID ${pageId} not found.`
      );
      return next(CreateError(404, "Page Not Found!"));
    }

    const notebook = await Notebook.findById(page.notebookId);
    if (!notebook) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Notebook for page ID ${pageId} not found.`
      );
      return next(CreateError(404, "Notebook Not Found!"));
    }

    // Check if the user owns the notebook
    if (notebook.userId.toString() !== userId) {
      console.log(
        `[${new Date().toISOString()}] ERROR: User ${userId} is not authorized to update page ${pageId}.`
      );
      return next(
        CreateError(403, "You are not authorized to update this page.")
      );
    }

    // Update the page if authorized
    const updatedPage = await Page.findByIdAndUpdate(
      pageId,
      { $set: req.body },
      { new: true }
    );

    console.log(
      `[${new Date().toISOString()}] INFO: Page with ID ${pageId} updated successfully.`
    );
    return next(CreateSuccess(200, "Page Updated!", updatedPage));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for updating a Page! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal Server Error for updating a Page!"));
  }
};

// Delete page
export const deletePage = async (req, res, next) => {
  try {
    const pageId = req.params.id;
    const page = await Page.findById(pageId);

    if (!page) {
      console.log(
        `[${new Date().toISOString()}] ERROR: Page with ID ${pageId} not found.`
      );
      return next(CreateError(404, "Page Not Found!"));
    }

    await Page.findByIdAndDelete(pageId);
    console.log(
      `[${new Date().toISOString()}] INFO: Page with ID ${pageId} deleted successfully.`
    );

    // Decrement the order of the pages after the deleted page
    const pages = await Page.find({ notebookId: page.notebookId });
    await Promise.all(
      pages.map(async (p, index) => {
        await Page.findByIdAndUpdate(p._id, { $set: { order: index + 1 } });
      })
    );

    return next(CreateSuccess(200, "Page Deleted!"));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for deleting a Page! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal Server Error for deleting a Page!"));
  }
};

// Get pages by notebook ID
export const getPagesByNotebookId = async (req, res, next) => {
  try {
    const notebookId = req.params.id;
    const pages = await Page.find({ notebookId: notebookId });

    if (!pages.length) {
      console.log(
        `[${new Date().toISOString()}] ERROR: No pages found for notebook ID ${notebookId}.`
      );
      return next(CreateError(404, "This notebook has no pages!"));
    }

    console.log(
      `[${new Date().toISOString()}] INFO: Pages fetched successfully for notebook ID ${notebookId}. Total pages: ${
        pages.length
      }`
    );
    return next(CreateSuccess(200, "Pages fetched successfully", pages));
  } catch (err) {
    console.error(
      `[${new Date().toISOString()}] ERROR: Internal Server Error for fetching Pages! Details: ${
        err.message
      }`
    );
    return next(CreateError(500, "Internal Server Error for fetching Pages!"));
  }
};
