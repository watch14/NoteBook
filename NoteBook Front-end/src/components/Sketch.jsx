import React, { useCallback, useEffect, useState } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import "../css/sketch.css";

// Constants
const SKETCH_ELEMENTS_LOCAL_STORAGE_KEY = "sketchElements";

const Sketch = ({ onElementsChange, sketchContent }) => {
  const [elements, setElements] = useState([]);

  // Load elements from sketchContent prop or localStorage
  useEffect(() => {
    if (Array.isArray(sketchContent)) {
      setElements(sketchContent); // Ensure sketchContent is an array
      console.log("Sketch content before rendering Excalidraw:", sketchContent);
    } else {
      const savedElements = localStorage.getItem(
        SKETCH_ELEMENTS_LOCAL_STORAGE_KEY
      );
      if (savedElements) {
        try {
          const parsedElements = JSON.parse(savedElements);
          if (Array.isArray(parsedElements)) {
            console.log("Loaded elements from localStorage:", parsedElements);
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

  // UI Options for Excalidraw
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

  // // Log data periodically
  // const logData = useCallback(() => {
  //   // Optional logging for debug purposes
  //   console.log("Data logged at:", new Date().toLocaleTimeString());
  //   console.log("Elements:", elements);
  // }, [elements]);

  // // Auto-save elements every 10 seconds
  // useEffect(() => {
  //   const saveInterval = setInterval(() => {
  //     logData();
  //   }, 10000); // 10 seconds

  //   return () => clearInterval(saveInterval);
  // }, [logData]);

  // Handle changes to the elements
  const handleChange = (newElements) => {
    setElements((prevElements) => {
      if (JSON.stringify(prevElements) !== JSON.stringify(newElements)) {
        console.log("Elements changed, saving to localStorage.");
        localStorage.setItem(
          SKETCH_ELEMENTS_LOCAL_STORAGE_KEY,
          JSON.stringify(newElements)
        );
        if (onElementsChange) {
          console.log(
            "Calling onElementsChange with new elements:",
            newElements
          );
          onElementsChange(newElements); // Notify parent component
        }
      }
      return newElements;
    });
  };

  return (
    <div className="sketch">
      <Excalidraw
        initialData={{
          elements: Array.isArray(sketchContent) ? sketchContent : [],
        }}
        onChange={handleChange}
        UIOptions={UIOptions}
        theme="dark"
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
