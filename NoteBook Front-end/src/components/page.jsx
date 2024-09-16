import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Sketch from "./sketch.jsx";
import Tiptap from "../utils/Tiptap";
import GeNotebookPages from "../utils/api.js";

import "../css/page.css";

const Page = () => {
  const { id } = useParams(); // Access the dynamic id parameter
  const [pages, setPages] = useState([]); // Array to hold all pages
  const [currentPageIndex, setCurrentPageIndex] = useState(0); // Index of the current page
  const [sketchElements, setSketchElements] = useState([]);
  const [tiptapContent, setTiptapContent] = useState("");
  const [text, setText] = useState(""); // Ensure this is correctly named
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const handleSketchElementsChange = (elements) => {
    console.log("Sketch elements changed:", elements); // Debugging line
    setSketchElements(elements);
  };

  const handleTiptapContentChange = (content) => {
    console.log("Tiptap content changed:", content); // Debugging line
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
        const data = await GeNotebookPages(id); // Fetch all pages for the notebook

        console.log("data", data);

        if (data && data.length > 0) {
          setPages(data); // Set all pages data
          setText(data[currentPageIndex].text); // Set text for the current page
        }
      } catch (error) {
        setError("Error fetching notebook pages.");
        console.error("Error fetching notebook pages:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id, currentPageIndex]); // Dependency on id and currentPageIndex

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
        />
      </div>
      <button onClick={printData}>Print Data</button>

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
