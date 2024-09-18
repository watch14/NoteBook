import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sketch from "./sketch";
import Keyboard from "./Keyboard"; // Import Keyboard component
import Tiptap from "../utils/Tiptap";
import GetNotebookPages, {
  savePage,
  getNotebook,
  createPage,
  updateNotebook, // Import updateNotebook function
} from "../utils/api";

import "../css/page.css";

const Page = () => {
  const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [text, setText] = useState("");
  const [sketch, setSketch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState(""); // State for notebook title
  const [isEditingTitle, setIsEditingTitle] = useState(false); // State to toggle title editing
  const [newTitle, setNewTitle] = useState(""); // State to hold the new title input value
  const [showSketch, setShowSketch] = useState(true); // State to toggle between Sketch and Keyboard

  const handleSketchElementsChange = (elements) => {
    setSketch(elements);
  };

  const handleTiptapContentChange = (content) => {
    setText(content);
  };

  const printData = () => {
    console.log("Sketch Elements:", sketch);
    console.log("Tiptap Content HTML:", text);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Fetch notebook title
        const notebookData = await getNotebook(id);
        setTitle(notebookData.title); // Set notebook title
        setNewTitle(notebookData.title); // Set new title for editing

        // Fetch notebook pages
        const data = await GetNotebookPages(id);
        if (data && data.length > 0) {
          setPages(data);
          setText(data[currentPageIndex]?.text || "<p></p>"); // Set default content
          const sketchData = data[currentPageIndex]?.sketch;

          if (sketchData && sketchData.trim() !== "") {
            try {
              setSketch(JSON.parse(sketchData)); // Parse the sketch data
            } catch (error) {
              console.error("Error parsing sketch data:", error);
              setSketch([]); // Set an empty sketch
            }
          } else {
            setSketch([]); // If no sketch data, set an empty array
          }
        }
      } catch (error) {
        setError("Error fetching notebook data.");
        console.error("Error fetching notebook data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPageIndex]);

  const handleSavePage = async () => {
    const currentPage = pages[currentPageIndex];
    console.log("Saving content:", text || "<empty>"); // Show if content is empty

    try {
      await savePage(
        id,
        currentPage?._id,
        Array.isArray(sketch) ? sketch : [],
        text || "<p></p>" // Ensure content is not empty
      );
      console.log("Page saved successfully.✅");
    } catch (error) {
      console.error("Error saving page:", error);
    }
  };

  // Handle the creation of a new page
  const handleCreateNewPage = async () => {
    try {
      const newPage = await createPage(id, [], "<p></p>"); // Create new page with empty sketch and content
      setPages([...pages, newPage]); // Add new page to the pages array
      setCurrentPageIndex(pages.length); // Navigate to the new page
      setText("<p></p>"); // Reset the editor content
      setSketch([]); // Reset the sketch content
      console.log("New page created successfully.");
    } catch (error) {
      console.error("Error creating new page:", error);
    }
  };

  const handleNextPage = () => {
    if (currentPageIndex < pages.length - 1) {
      setCurrentPageIndex((prevIndex) => prevIndex + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex((prevIndex) => prevIndex - 1);
    }
  };

  // Handle navigating to a specific page by index
  const handleGoToPage = (index) => {
    setCurrentPageIndex(index);
  };

  // Handle title click to enable editing
  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  // Handle title input change
  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  // Handle updating the title
  const handleTitleUpdate = async () => {
    if (newTitle !== title) {
      try {
        await updateNotebook(id, { title: newTitle });
        setTitle(newTitle); // Update the displayed title
      } catch (error) {
        console.error("Error updating notebook title:", error);
        setError("Failed to update title.");
      }
    }
    setIsEditingTitle(false); // Exit editing mode
  };

  // Handle key press in the title input field (e.g., Enter key to save)
  const handleTitleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTitleUpdate();
    }
  };

  // Handle toggling between Sketch and Keyboard components
  const handleToggleView = () => {
    setShowSketch((prev) => !prev);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      {/* Render editable title */}
      {isEditingTitle ? (
        <input
          type="text"
          value={newTitle}
          onChange={handleTitleChange}
          onBlur={handleTitleUpdate} // Save when input loses focus
          onKeyPress={handleTitleKeyPress} // Save on Enter press
          autoFocus
        />
      ) : (
        <h1 onClick={handleTitleClick}>{title || "Loading Title..."}</h1> // Display title or "Loading..." if title is missing
      )}

      {/* Buttons to toggle between Sketch and Keyboard */}
      <div className="view-toggle-buttons">
        <button onClick={handleToggleView}>
          {showSketch ? "Show Keyboard" : "Show Sketch"}
        </button>
      </div>

      <div className="page">
        <Tiptap
          onContentChange={handleTiptapContentChange}
          textContent={text} // Pass textContent to Tiptap
        />

        {showSketch ? (
          <Sketch
            className="sketcher"
            onElementsChange={handleSketchElementsChange}
            sketchContent={sketch} // Pass sketchContent to Sketch
          />
        ) : (
          <Keyboard />
        )}
      </div>

      <button onClick={printData}>Print Data</button>
      <button onClick={handleSavePage}>Save Page</button>
      <button onClick={handleCreateNewPage}>Create New Page</button>

      {/* Render page number buttons */}
      <div className="page-buttons">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToPage(index)}
            className={index === currentPageIndex ? "active" : ""}
          >
            Page {index + 1}
          </button>
        ))}
      </div>

      <div className="pagination">
        <button onClick={handlePreviousPage} disabled={currentPageIndex === 0}>
          Previous
        </button>
        <span>
          Page {currentPageIndex + 1} of {pages.length}
        </span>
        <button
          onClick={handleNextPage}
          disabled={currentPageIndex === pages.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Page;
