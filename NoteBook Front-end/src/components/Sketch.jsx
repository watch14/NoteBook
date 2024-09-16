import React, { useCallback, useEffect, useState } from "react";
import { Excalidraw, WelcomeScreen } from "@excalidraw/excalidraw";
import "../css/sketch.css";

// Constants
const SKETCH_ELEMENTS_LOCAL_STORAGE_KEY = "sketchElements";

const Sketch = ({ onElementsChange }) => {
  const [elements, setElements] = useState([]);

  // Initialize elements from localStorage
  useEffect(() => {
    const savedElements = localStorage.getItem(
      SKETCH_ELEMENTS_LOCAL_STORAGE_KEY
    );
    if (savedElements) {
      try {
        const parsedElements = JSON.parse(savedElements);
        console.log("Loaded elements from localStorage:", parsedElements);
        setElements(parsedElements);
      } catch (error) {
        console.error("Error parsing saved elements from localStorage", error);
      }
    }
  }, []);

  // UIOptions should not change on every render
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

  // Function to log data at regular intervals
  const logData = useCallback(() => {
    // console.log("Data logged at:", new Date().toLocaleTimeString());
    // console.log("Elements:", elements);
  }, [elements]);

  // Use effect to set up interval
  useEffect(() => {
    const saveInterval = setInterval(() => {
      logData();
    }, 10000); // 10 seconds

    // Cleanup on unmount
    return () => clearInterval(saveInterval);
  }, [logData]);

  // Update state only if new values are different
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
    <div className="sktech">
      <Excalidraw
        initialData={{ elements }} // Ensure this is the correct prop
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
