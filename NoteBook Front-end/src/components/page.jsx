import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sketch from "./sketch";
import Keyboard from "./Keyboard"; // Import Keyboard component
import Tiptap from "../utils/Tiptap";
import GetNotebookPages, {
  savePage,
  getNotebook,
  createPage,
  updateNotebook,
  deletePage, // Import the deletePage function
} from "../utils/api";
import { PuffLoader, BounceLoader } from "react-spinners";

import {
  ChevronRight,
  ChevronLeft,
  Plus,
  Save,
  SaveAll,
  Trash2,
  Languages,
  Brush,
} from "lucide-react";
import "../css/page.css";

const Page = () => {
  const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [text, setText] = useState("");
  const [sketch, setSketch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [title, setTitle] = useState("");
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [showSketch, setShowSketch] = useState(true);
  const [saving, setSaving] = useState(false); // State for saving loader

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
        const notebookData = await getNotebook(id);
        setTitle(notebookData.title);
        setNewTitle(notebookData.title);

        const data = await GetNotebookPages(id);
        if (data && data.length > 0) {
          setPages(data);
          setText(data[currentPageIndex]?.text || "<p></p>");
          const sketchData = data[currentPageIndex]?.sketch;

          if (sketchData && sketchData.trim() !== "") {
            try {
              setSketch(JSON.parse(sketchData));
            } catch (error) {
              console.error("Error parsing sketch data:", error);
              setSketch([]);
            }
          } else {
            setSketch([]);
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
    console.log("Saving content:", text || "<empty>");
    setSaving(true); // Start saving loader

    try {
      await savePage(
        id,
        currentPage?._id,
        Array.isArray(sketch) ? sketch : [],
        text || "<p></p>"
      );
      console.log("Page saved successfully.✅");
    } catch (error) {
      console.error("Error saving page:", error);
    } finally {
      setSaving(false); // End saving loader
    }
  };

  const handleCreateNewPage = async () => {
    try {
      const newPage = await createPage(id, [], "<p></p>");
      setPages([...pages, newPage]);
      setCurrentPageIndex(pages.length);
      setText("<p></p>");
      setSketch([]);
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

  const handleGoToPage = (index) => {
    setCurrentPageIndex(index);
  };

  const handleTitleClick = () => {
    setIsEditingTitle(true);
  };

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value);
  };

  const handleTitleUpdate = async () => {
    if (newTitle !== title) {
      try {
        await updateNotebook(id, { title: newTitle });
        setTitle(newTitle);
      } catch (error) {
        console.error("Error updating notebook title:", error);
        setError("Failed to update title.");
      }
    }
    setIsEditingTitle(false);
  };

  const handleTitleKeyPress = (event) => {
    if (event.key === "Enter") {
      handleTitleUpdate();
    }
  };

  const handleToggleView = () => {
    setShowSketch((prev) => !prev);
  };

  const handleDeletePage = async () => {
    const currentPage = pages[currentPageIndex];
    if (currentPage) {
      // Show a confirmation dialog
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this page?"
      );
      if (!confirmDelete) {
        console.log("Page deletion canceled.");
        return; // Exit the function if the user cancels
      }

      try {
        await deletePage(currentPage._id);
        // Update state after deletion
        setPages((prevPages) =>
          prevPages.filter((_, index) => index !== currentPageIndex)
        );
        setCurrentPageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));
        console.log("Page deleted successfully.");
      } catch (error) {
        console.error("Error deleting page:", error);
      }
    }
  };

  if (loading)
    return (
      <div className="loader">
        <BounceLoader color="#E60012" size={100} />
      </div>
    );
  if (error) return <p>{error}</p>;

  return (
    <div className="page-cont">
      <div className="page-title-bg">
        {isEditingTitle ? (
          <input
            className="page-title"
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            onBlur={handleTitleUpdate}
            onKeyPress={handleTitleKeyPress}
            autoFocus
          />
        ) : (
          <h1 className="page-title" onClick={handleTitleClick}>
            {title || "Loading Title..."}
          </h1>
        )}

        <div className="utils">
          {/* <button onClick={printData}>Print Data</button> */}

          {pages.length <= 15 && (
            <button
              className="p-plus"
              disabled={pages.length === 18}
              onClick={handleCreateNewPage}
            >
              <Plus />
            </button>
          )}

          <button className="p-save" onClick={handleSavePage} disabled={saving}>
            {saving ? <SaveAll /> : <Save />}
          </button>

          <button
            className="p-del"
            onClick={handleDeletePage}
            disabled={pages.length === 0}
          >
            <Trash2 />
          </button>
          <div className="view-toggle-buttons">
            <button onClick={handleToggleView}>
              {showSketch ? <Languages /> : <Brush />}
            </button>
          </div>
        </div>
      </div>

      <div className="page">
        <div className="page-text">
          <Tiptap
            onContentChange={handleTiptapContentChange}
            textContent={text}
          />
          <button
            className="pagin1"
            onClick={handlePreviousPage}
            disabled={currentPageIndex === 0}
          >
            <ChevronLeft />
          </button>
        </div>

        <div className="mid-page"></div>
        <div className="page-right">
          <div className="p-right-in">
            {showSketch ? (
              <Sketch
                className="sketcher"
                onElementsChange={handleSketchElementsChange}
                sketchContent={sketch}
              />
            ) : (
              <Keyboard />
            )}
          </div>
          <button
            className="pagin1"
            onClick={handleNextPage}
            disabled={currentPageIndex === pages.length - 1}
          >
            <ChevronRight />
          </button>

          <div className="pages-buttons">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleGoToPage(index)}
                className={index === currentPageIndex ? "active" : ""}
              >
                {index + 1}
              </button>
            ))}

            {pages.length <= 15 && (
              <button
                className="p-plus"
                disabled={pages.length === 18}
                onClick={handleCreateNewPage}
              >
                <Plus />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="utils2">
        <button
          className="pagin"
          onClick={handlePreviousPage}
          disabled={currentPageIndex === 0}
        >
          <ChevronLeft />
        </button>
        {pages.length <= 15 && (
          <button
            className="p-plus"
            disabled={pages.length === 18}
            onClick={handleCreateNewPage}
          >
            New Page
          </button>
        )}
        {/* <button onClick={printData}>Print Data</button> */}
        <button className="p-save" onClick={handleSavePage} disabled={saving}>
          {saving ? "Saving..." : "Save Page"}
        </button>

        <button
          className="p-del"
          onClick={handleDeletePage}
          disabled={pages.length === 0}
        >
          Delete Page
        </button>

        <button
          className="pagin"
          onClick={handleNextPage}
          disabled={currentPageIndex === pages.length - 1}
        >
          <ChevronRight />
        </button>
      </div>

      {/* <div className="page-buttons">
        {pages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToPage(index)}
            className={index === currentPageIndex ? "active" : ""}
          >
            Page {index + 1}
          </button>
        ))}
      </div> */}

      {/* <div className="p-pagination">
        <button
          className="pagin"
          onClick={handlePreviousPage}
          disabled={currentPageIndex === 0}
        >
          Prev Page
        </button>
        <span>
          Page {currentPageIndex + 1} of {pages.length}
        </span>
        <button
          className="pagin"
          onClick={handleNextPage}
          disabled={currentPageIndex === pages.length - 1}
        >
          Next Page
        </button>
      </div> */}
    </div>
  );
};

export default Page;
