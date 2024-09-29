import React, { useState } from "react";
import "../css/addNotebook.css"; // Make sure this contains styles for gradients and themes
import themeStyles from "../utils/notebooktheme"; // Import the theme styles

function AddNotebook({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("sakura"); // Default theme

  const handleSubmit = (e) => {
    e.preventDefault();
    const themeStyle = themeStyles[theme];
    onAdd({ title, theme: themeStyle });
    setTitle(""); // Clear the form
    setTheme("sakura"); // Reset theme to default
  };

  // Stop propagation when clicking inside the popup content
  const handlePopupClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="popup-overlay" onClick={onClose}>
      <div className="popup-content" onClick={handlePopupClick}>
        <h2>Add Notebook</h2>
        <form className="notebook-form" onSubmit={handleSubmit}>
          <label>
            Add Title:
            <input
              id="title"
              value={title}
              onChange={(e) => {
                // Capitalize the first letter of each word
                const formattedTitle = e.target.value
                  .split(" ")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                  .join(" ");

                setTitle(formattedTitle); // Update the state with the formatted title
              }}
              required
              className="text-lg"
              placeholder="Enter your notebook title"
            />
          </label>

          <div className="theme-selector">
            <label>Select Theme:</label>
            <div className="theme-buttons">
              {Object.keys(themeStyles).map((themeKey) => (
                <button
                  key={themeKey}
                  type="button" // Prevent form submission
                  onClick={() => setTheme(themeKey)} // Set the selected theme
                  className={theme === themeKey ? "active" : ""}
                  style={{
                    background: themeStyles[themeKey], // Apply the theme background
                  }}
                >
                  {themeKey.replace(/^\w/, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          {/* <div
            className="theme-preview"
            style={{
              backgroundImage: themeStyles[theme], // Use the actual theme style
              width: "100%",
              height: "60px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            {title || "Your Notebook Title"}
          </div> */}
          <div className="buttns">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="ad-c" type="submit">
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNotebook;
