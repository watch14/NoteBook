import React, { useState } from "react";
import "../css/addNotebook.css"; // Make sure this contains styles for gradients and themes

// Define a mapping from theme names to actual CSS properties
const themeStyles = {
  sakura: "linear-gradient(to right, #ff9a9e, #fad0c4)",
  mountFuji: "linear-gradient(to right, #a1c4fd, #c2e9fb)",
  bambooForest: "linear-gradient(to right, #d4fc79, #96e6a1)",
  koiFish: "linear-gradient(to right, #ff6e7f, #bfe9ff)",
  washiPaper: "linear-gradient(to right, #f3f4f6, #e6e8eb)",
  templeRed: "linear-gradient(to right, #ff7e5f, #feb47b)",
  zenGarden: "linear-gradient(to right, #a8c0ff, #3f2b96)",
  plumBlossom: "linear-gradient(to right, #d5aaff, #e5c1d9)",
};

function AddNotebook({ onAdd, onClose }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("sakura"); // Default theme

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the actual theme style, not just the name
    const themeStyle = themeStyles[theme];
    onAdd({ title, theme: themeStyle });
    setTitle(""); // Clear the form
    setTheme("sakura"); // Reset theme to default
    console.log(themeStyle); // Check the selected theme style
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

          <div
            className="theme-preview"
            style={{
              backgroundImage: themeStyles[theme], // Use the actual theme style
              width: "100%",
              height: "100px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundSize: "cover", // Set the background size separately
              backgroundPosition: "center", // Set the background position separately
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
