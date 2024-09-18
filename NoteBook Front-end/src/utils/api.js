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
