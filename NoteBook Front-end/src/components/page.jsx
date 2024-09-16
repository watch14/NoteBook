import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Sketch from "./sketch";
import Tiptap from "../utils/Tiptap";
import GetNotebookPages, { savePage } from "../utils/api";

import "../css/page.css";

const Page = () => {
  const { id } = useParams();
  const [pages, setPages] = useState([]);
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [sketchElements, setSketchElements] = useState([]);
  const [tiptapContent, setTiptapContent] = useState("");
  const [text, setText] = useState("");
  const [sketch, setSketch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSketchElementsChange = (elements) => {
    console.log("Sketch elements changed:", elements);
    setSketchElements(elements);
  };

  const handleTiptapContentChange = (content) => {
    console.log("Tiptap content changed:", content);
    setTiptapContent(content);
  };

  const printData = () => {
    console.log("Sketch Elements:", sketchElements);
    console.log("Tiptap Content HTML:", tiptapContent);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await GetNotebookPages(id);
        console.log("Fetched data:", data);
        if (data && data.length > 0) {
          setPages(data);
          setText(data[currentPageIndex]?.text || "");
          setSketch(data[currentPageIndex]?.sketch || "");
        }
      } catch (error) {
        setError("Error fetching notebook pages.");
        console.error("Error fetching notebook pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPageIndex]);

  const handleSavePage = async () => {
    const currentPage = pages[currentPageIndex];
    try {
      await savePage(id, currentPage?._id, sketchElements, tiptapContent);
      console.log("Page saved successfully.");
    } catch (error) {
      console.error("Error saving page:", error);
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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h1>Welcome to NoteBook</h1>
      <div className="page">
        <Tiptap
          onContentChange={handleTiptapContentChange}
          textContent={text} // Pass textContent to Tiptap
        />
        <Sketch
          className="sketcher"
          onElementsChange={handleSketchElementsChange}
          sketchContent={sketch} // Pass sketchContent to Sketch
        />
      </div>
      <button onClick={printData}>Print Data</button>
      <button onClick={handleSavePage}>Save Page</button>

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
