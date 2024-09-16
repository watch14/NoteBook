import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom"; // Import useParams
import Sketch from "./sketch.jsx";
import Tiptap from "../utils/Tiptap";
import GeNotebookPages from "../utils/api.js";

import "../css/page.css";

const Page = () => {
  const { id } = useParams(); // Access the dynamic id parameter
  const [sketchElements, setSketchElements] = useState([]);
  const [tiptapContent, setTiptapContent] = useState("");
  const [text, setText] = useState(""); // Ensure this is correctly named

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
      try {
        const data = await GeNotebookPages(id); // Use dynamic id

        console.log("data", data);

        if (data && data.length > 0) {
          const textContent = data[0].text;
          setText(textContent); // Update the state
        }
      } catch (error) {
        console.error("Error fetching notebook pages:", error);
      }
    };

    fetchData();
  }, [id]); // Dependency on id

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
    </div>
  );
};

export default Page;
