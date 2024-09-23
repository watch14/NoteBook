// api urls
import axios from "axios";

export const Api = "http://localhost:5000/api/";

export const getNotebook = async (id) => {
  try {
    const response = await axios.get(Api + `notebooks/get/${id}`);
    if (response.data.success) {
      return response.data.data; // Return the notebook data
    } else {
      throw new Error(response.data.message || "Error fetching notebook");
    }
  } catch (error) {
    console.error("API Error:", error.message); // Improved error logging
    throw new Error(error.message || "Error fetching notebook");
  }
};

export const updateNotebook = async (notebookId, updatedData) => {
  try {
    const response = await axios.put(
      Api + `notebooks/update/${notebookId}`,
      updatedData
    );
    if (response.data.success) {
      return response.data.data; // Return the updated notebook data
    } else {
      throw new Error(response.data.message || "Error updating notebook");
    }
  } catch (error) {
    console.error("API Error:", error.message); // Improved error logging
    throw new Error(error.message || "Error updating notebook");
  }
};

// Function to delete a notebook
const handleDeleteNotebook = async (notebookId) => {
  const confirmDelete = window.confirm(
    "Are you sure you want to delete this notebook? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    await axios.delete(`${Api}notebooks/delete/${notebookId}`);

    // Update the state by filtering out the deleted notebook
    setNotebooks((prevNotebooks) =>
      prevNotebooks.filter((notebook) => notebook._id !== notebookId)
    );
  } catch (err) {
    setError(`Failed to delete notebook: ${err.message}`);
    console.error(err);
  }
};

export default async function GetNotebookPages(id) {
  const res = await axios.get(Api + `pages/notebook/${id}`);

  if (res.data.error) {
    throw new Error(res.data.error);
  }
  if (res.data.success) {
    return res.data.data;
  }
}

// Function to save or update a page
export const savePage = async (
  notebookId,
  pageId,
  sketchElements,
  tiptapContent
) => {
  const pageData = {
    notebookId, // The notebook ID where the page belongs
    text: tiptapContent, // The content from the Tiptap editor
    sketch: JSON.stringify(sketchElements), // The sketch content as a string
  };

  try {
    const response = await axios({
      method: pageId ? "put" : "post",
      url: pageId ? `${Api}pages/update/${pageId}` : `${Api}pages/create`,
      data: pageData,
      headers: { "Content-Type": "application/json" },
    });
    console.log("Page saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error saving page:", error);
    throw error;
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
    const response = await axios({
      method: "post",
      url: `${Api}pages/create`,
      data: pageData,
      headers: { "Content-Type": "application/json" },
    });
    console.log("New page created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating page:", error);
    throw error;
  }
};

// Function to delete a page
export const deletePage = async (pageId) => {
  try {
    const response = await axios.delete(`${Api}pages/delete/${pageId}`);
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

///////////////////////
//////////////////////
//translating
export const translateText = async (text) => {
  try {
    const response = await axios.post(`${Api}translate`, { text });

    // Check if the response contains the expected structure
    if (response.data && response.data.success && response.data.data) {
      return response.data.data; // Return the full data object
    } else {
      throw new Error(response.data.message || "Translation failed.");
    }
  } catch (error) {
    console.error("Error translating text:", error.message);
    throw new Error("Error translating text.");
  }
};
