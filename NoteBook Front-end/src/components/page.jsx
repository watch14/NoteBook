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
  const [text, setText] = useState("");
  const [sketch, setSketch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

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
        const data = await GetNotebookPages(id); // Fetch notebook pages
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
