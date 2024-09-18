import React, { useEffect, useState, useContext } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import "../css/sketch.css";
import { ThemeContext } from "../context/ThemeContext"; // Import ThemeContext

const SKETCH_ELEMENTS_LOCAL_STORAGE_KEY = "sketchElements";

const Sketch = ({ onElementsChange, sketchContent }) => {
  const { theme } = useContext(ThemeContext); // Get the current theme from context
  const [elements, setElements] = useState([]);

  useEffect(() => {
    if (Array.isArray(sketchContent)) {
      setElements(sketchContent);
    } else {
      const savedElements = localStorage.getItem(
        SKETCH_ELEMENTS_LOCAL_STORAGE_KEY
      );
      if (savedElements) {
        try {
          const parsedElements = JSON.parse(savedElements);
          if (Array.isArray(parsedElements)) {
            setElements(parsedElements);
          } else {
            console.error("Parsed elements are not an array.");
          }
        } catch (error) {
          console.error(
            "Error parsing saved elements from localStorage",
            error
          );
        }
      }
    }
  }, [sketchContent]);

  const handleChange = (newElements) => {
    setElements(newElements); // Update the local state
    localStorage.setItem(
      SKETCH_ELEMENTS_LOCAL_STORAGE_KEY,
      JSON.stringify(newElements)
    ); // Save to localStorage
    if (onElementsChange) {
      onElementsChange(newElements); // Notify parent component
    }
  };

  const UIOptions = {
    canvasActions: {
      changeViewBackgroundColor: true,
      clearCanvas: true,
      loadScene: true,
      saveToActiveFile: true,
      toggleTheme: true,
      saveAsImage: true,
      export: {
        saveFileToDisk: true,
        onExportToBackend: (elements, appState) => {
          console.log("Export to backend", elements, appState);
        },
      },
    },
    dockedSidebarBreakpoint: 10,
    welcomeScreen: true,
    tools: {
      image: true,
    },
  };

  return (
    <div className="sketch">
      <Excalidraw
        initialData={{
          elements: Array.isArray(sketchContent) ? sketchContent : [],
        }}
        onChange={handleChange}
        UIOptions={UIOptions}
        theme={theme === "dark" ? "dark" : "light"} // Set theme dynamically
      >
        <WelcomeScreen>
          <WelcomeScreen.Hints.ToolbarHint>
            <p>Explore the toolbar to get started.</p>
          </WelcomeScreen.Hints.ToolbarHint>
          <WelcomeScreen.Hints.MenuHint />
          <WelcomeScreen.Hints.HelpHint />
        </WelcomeScreen>
      </Excalidraw>
    </div>
  );
};

export default Sketch;
