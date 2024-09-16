import React, { useState } from "react";
import Sketch from "./sketch.jsx";
import Tiptap from "../utils/Tiptap";

import "../css/page.css";

const Page = () => {
  const [sketchElements, setSketchElements] = useState([]);
  const [tiptapContent, setTiptapContent] = useState("");

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

  return (
    <div>
      <h1>Welcome to NoteBook</h1>
      <div className="page">
        <Tiptap onContentChange={handleTiptapContentChange} />
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
