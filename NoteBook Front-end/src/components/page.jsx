import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sketch from "./sketch";
import Keyboard from "./Keyboard";
import Tiptap from "../utils/Tiptap";
import GetNotebookPages, {
  savePage,
  getNotebook,
  createPage,
  updateNotebook,
  deletePage,
  getPageById,
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

import { getUserId } from "../utils/auth";
import "../css/page.css";
import { co } from "google-translate-api-jp/languages";

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
  const [saving, setSaving] = useState(false);
  const [localVersion, setLocalVersion] = useState(1);
  const [webVersion, setWebVersion] = useState(1);
  const [version, setVersion] = useState(1);

  const LOCAL_STORAGE_KEY = `notebook_${id}_page_${currentPageIndex}`;

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

  const getLocalStorageVersion = () => {
    const localContent = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (localContent) {
      setLocalVersion(localContent.version);
      return localContent.version;
    } else {
      // Handle the case where localContent is null
      console.warn("No local storage content found for this page.");
      setLocalVersion(1); // Default version or any other logic
      return 1; // Default value for version if nothing is found
    }
  };

  const getServerVersion = async () => {
    try {
      const currentPage = pages[currentPageIndex];
      if (currentPage) {
        const page = await getPageById(currentPage._id);
        console.log("Server version:", page.version);
        setWebVersion(page.version);
      }
    } catch (error) {
      console.error("Error fetching server version:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const notebookData = await getNotebook(id);
        if (notebookData.userId !== getUserId()) {
          console.log("User not authorized to view this notebook.");
          window.location.href = "/notebooks";
          return;
        }
        setTitle(notebookData.title);
        setNewTitle(notebookData.title);

        try {
          const data = await GetNotebookPages(id);
          if (data && data.length > 0) {
            setPages(data);
            const localContent = JSON.parse(
              localStorage.getItem(LOCAL_STORAGE_KEY)
            );

            //////////// SET VERSIONS ////////////
            if (localContent) {
              setLocalVersion(localContent.version || 1);
              console.log("..........Local Version:", localContent.version);
            } else {
              setLocalVersion(1);
              console.log("..........Local Version:", localVersion);
            }

            setWebVersion(data[currentPageIndex]?.version);
            console.log(
              "..........Server Version:",
              data[currentPageIndex]?.version
            );
            const web = data[currentPageIndex]?.version;
            const loc = localContent?.version || 1;

            ///////////// versions /////////////
            if (localContent) {
              if (web > loc) {
                //// WEB VERSION
                console.log("Server version is ahead of Local version.");
                setText(data[currentPageIndex]?.text || "<p></p>");
                setSketch(
                  JSON.parse(data[currentPageIndex]?.sketch || "[]") || []
                );
              } else if (web < loc) {
                //// LOCAL VERSION
                console.log("Local version is ahead of Server version.");
                if (localContent) {
                  setText(localContent.text || "<p></p>");
                  setSketch(localContent.sketch || []);
                }
              } else {
                console.log("Local and server versions are in sync.");
                setText(localContent.text || "<p></p>");
                setSketch(localContent.sketch || []);
              }
            } else {
              setText(data[currentPageIndex]?.text || "<p></p>");
              setSketch(
                JSON.parse(data[currentPageIndex]?.sketch || "[]") || []
              );
            }
          }
        } catch (error) {
          console.error("Error fetching notebook pages:", error);
          setError("Error fetching notebook pages. Please try again later.");
        }
      } catch (error) {
        setError("Error fetching notebook data. Please try again later.");
        console.error("Error fetching notebook data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPageIndex]);

  const handleSavePage = async () => {
    const currentPage = pages[currentPageIndex];

    setSaving(true);
    try {
      const newVersion = version;
      console.log("Loc -> V", localVersion);
      console.log("web -> V", webVersion);
      console.log("new -> V", version);

      if (webVersion > localVersion) {
        setVersion(webVersion);
      } else {
        setVersion(localVersion);
      }

      try {
        const updatedPage = await savePage(
          id,
          currentPage?._id,
          Array.isArray(sketch) ? sketch : [],
          text || "<p></p>"
        );

        if (updatedPage.success) {
          console.log("Page saved successfully to the database.");

          // Update local version to match server version
          setVersion(updatedPage.data.version);

          // Save the current page content to local storage
          localStorage.setItem(
            LOCAL_STORAGE_KEY,
            JSON.stringify({
              text: text || "<p></p>",
              sketch: Array.isArray(sketch) ? sketch : [],
              version: version + 1,
            })
          );
          console.log("Page saved to local storage.");
          const loc = await getLocalStorageVersion();
        } else {
          console.error("Error saving page:", updatedPage.message);
        }
      } catch (error) {
        console.error("Error saving page to server:", error);
      }
    } catch (error) {
      console.error("Error during save operation:", error);
    } finally {
      setSaving(false);
    }
  };

  const handleCreateNewPage = async () => {
    try {
      const newPage = await createPage(id, [], "<p></p>");
      setPages([...pages, newPage]);
      setCurrentPageIndex(pages.length);
      setText("<p></p>");
      setSketch([]);
      setVersion(1);
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
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this page?"
      );
      if (!confirmDelete) {
        console.log("Page deletion canceled.");
        return;
      }

      try {
        await deletePage(currentPage._id);
        setPages((prevPages) =>
          prevPages.filter((_, index) => index !== currentPageIndex)
        );
        setCurrentPageIndex((prevIndex) => (prevIndex > 0 ? prevIndex - 1 : 0));

        // Remove from localStorage
        localStorage.removeItem(LOCAL_STORAGE_KEY);
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

          {pages.length <= 15 && (
            <button
              className="p-plus"
              disabled={pages.length === 18}
              onClick={handleCreateNewPage}
            >
              <Plus />
            </button>
          )}

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

          {pages.length > 0 && currentPageIndex > 0 && (
            <button className="pagin1" onClick={handlePreviousPage}>
              <ChevronLeft />
            </button>
          )}
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

          {pages.length > 0 &&
            pages.length < 16 &&
            (currentPageIndex < pages.length - 1 ? (
              <button className="pagin1" onClick={handleNextPage}>
                <ChevronRight />
              </button>
            ) : (
              <button
                className="pagin1"
                onClick={handleCreateNewPage}
                disabled={pages.length >= 16} // Disable the button when there are 16 pages
              >
                <Plus />
              </button>
            ))}

          <div className="pages-buttons">
            {pages.map((_, index) => (
              <button
                key={index}
                onClick={() => handleGoToPage(index)}
                className={
                  index === currentPageIndex
                    ? "active page-button"
                    : "page-button"
                } // Add conditional class
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

        {pages.length <= 15 && (
          <button
            className="p-plus"
            disabled={pages.length === 18}
            onClick={handleCreateNewPage}
          >
            New Page
          </button>
        )}

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
