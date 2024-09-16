// api urls
import axios from "axios";

export const Api = "http://localhost:5000/api/";

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
