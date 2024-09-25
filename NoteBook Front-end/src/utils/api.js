import axios from "axios";
import { getToken, getUserId } from "./auth";

// Create the Axios instance with a base URL
export const Api = axios.create({
  baseURL: "http://localhost:5000/api/", // Your API base URL
});

// Add a request interceptor to include the token in every request
Api.interceptors.request.use(
  (config) => {
    const token = getToken(); // Get token from localStorage
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Function to fetch a notebook by its ID
export const getNotebook = async (id) => {
  try {
    const response = await Api.get(`notebooks/get/${id}`);
    if (response.data.success) {
      return response.data.data; // Return the notebook data
    } else {
      throw new Error(response.data.message || "Error fetching notebook");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Error fetching notebook.");
  }
};

// Function to update a notebook
export const updateNotebook = async (notebookId, updatedData) => {
  try {
    const response = await Api.put(
      `notebooks/update/${notebookId}`,
      updatedData
    );
    if (response.data.success) {
      return response.data.data; // Return the updated notebook data
    } else {
      throw new Error(response.data.message || "Error updating notebook");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Error updating notebook.");
  }
};

// Function to delete a notebook
export const deleteNotebook = async (notebookId, setNotebooks, setError) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this notebook? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    await Api.delete(`notebooks/delete/${notebookId}`);

    // Update the state by filtering out the deleted notebook
    setNotebooks((prevNotebooks) =>
      prevNotebooks.filter((notebook) => notebook._id !== notebookId)
    );
  } catch (error) {
    setError(`Failed to delete notebook: ${error.message}`);
    console.error("Error deleting notebook:", error.message);
  }
};

// Function to get pages of a notebook by notebook ID
export default async function getNotebookPages(id) {
  try {
    const response = await Api.get(`pages/notebook/${id}`);
    if (response.data.success) {
      return response.data.data; // Return the pages data
    } else {
      throw new Error(response.data.message || "Error fetching pages");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Error fetching pages.");
  }
}

// Function to save or update a page
export const savePage = async (
  notebookId,
  pageId,
  sketchElements,
  tiptapContent,
  version // Accept the version as a parameter
) => {
  const pageData = {
    notebookId,
    text: tiptapContent,
    sketch: JSON.stringify(sketchElements), // Save sketch elements as a string
    version, // Include the version in the request body
  };

  try {
    const response = await Api({
      method: pageId ? "put" : "post",
      url: pageId ? `pages/update/${pageId}` : `pages/create`,
      data: pageData,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Page saved:", response.data);
    return response.data; // Return the response data, which should include the updated page
  } catch (error) {
    console.error("Error saving page:", error.message);
    throw new Error("Error saving page.");
  }
};

// Function to create a new page
export const createPage = async (
  notebookId,
  sketchElements = "",
  tiptapContent = ""
) => {
  const pageData = {
    notebookId,
    text: tiptapContent,
    sketch: JSON.stringify(sketchElements),
  };

  try {
    const response = await Api.post(`pages/create`, pageData, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("New page created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error.message);
    throw new Error("Error creating page.");
  }
};

// Function to delete a page by its ID
export const deletePage = async (pageId) => {
  try {
    const response = await Api.delete(`pages/delete/${pageId}`);
    if (response.data.success) {
      console.log("Page deleted successfully:", response.data.message);
      return response.data; // Optionally return success data
    } else {
      throw new Error(response.data.message || "Error deleting page");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Failed to delete page.");
  }
};

// Function to translate text using an API
export const translateText = async (text) => {
  try {
    const response = await Api.post(`translate`, { text });

    if (response.data.success && response.data.data) {
      return response.data.data; // Return the translation result
    } else {
      throw new Error(response.data.message || "Translation failed.");
    }
  } catch (error) {
    console.error("Error translating text:", error.message);
    throw new Error("Error translating text.");
  }
};

//getpage by id
export const getPageById = async (id) => {
  try {
    const response = await Api.get(`pages/get/${id}`);
    if (response.data.success) {
      return response.data.data; // Return the page data
    } else {
      throw new Error(response.data.message || "Error fetching page");
    }
  } catch (error) {
    console.error("API Error:", error.message);
    throw new Error("Error fetching page.");
  }
};
