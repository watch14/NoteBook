import React, { useState } from "react";
import "../css/addNotebook.css"; // Make sure this contains styles for gradients and themes

function AddNotebook({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("sakura"); // Default theme

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, theme });
    setTitle(""); // Clear the form
    setTheme("sakura"); // Reset theme to default
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
              <option value="sakura">Sakura (Cherry Blossom)</option>
              <option value="mountFuji">Mount Fuji</option>
              <option value="bambooForest">Bamboo Forest</option>
              <option value="koiFish">Koi Fish</option>
              <option value="washiPaper">Washi Paper Texture</option>
              <option value="templeRed">Temple Red</option>
              <option value="zenGarden">Zen Garden</option>
              <option value="plumBlossom">Plum Blossom</option>
            </select>
          </label>

          {/* Live preview box */}
          <div
            className="theme-preview"
            style={{
              background: `var(--${theme}-theme)`, // Dynamic CSS theme preview
              width: "100%",
              height: "100px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
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
