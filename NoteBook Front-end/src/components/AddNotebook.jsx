import React, { useState } from "react";
import "../css/addNotebook.css"; // Ensure this contains styles for gradients

function AddNotebook({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("grey"); // Default theme

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, theme });
    setTitle(""); // Clear the form
    setTheme("grey"); // Reset theme to default
  };

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Add Notebook</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <label>
            Theme:
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)} // Update theme on selection
            >
              <option value="blue">Blue</option>
              <option value="red">Red</option>
              <option value="green">Green</option>
              <option value="linear-gradient(to right, #ff7e5f, #feb47b)">
                Sunset
              </option>
              <option value="linear-gradient(to right, #00c6ff, #0072ff)">
                Ocean
              </option>
              <option value="linear-gradient(to right, #ff0099, #493240)">
                Purple
              </option>
              {/* Add more gradient options as needed */}
            </select>
          </label>

          {/* Live preview box */}
          <div
            className="theme-preview"
            style={{
              background: theme, // Dynamic background based on selected theme
              width: "100%",
              height: "50px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          ></div>

          <button type="submit">Add</button>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNotebook;
