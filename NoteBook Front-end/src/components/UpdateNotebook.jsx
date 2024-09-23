import React, { useEffect, useState } from "react";
import { getNotebook, updateNotebook } from "../utils/api";
import "../css/addNotebook.css"; // Make sure this contains styles for gradients and themes

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

function UpdateNotebook({ notebookId, onUpdate, onClose }) {
  const [title, setTitle] = useState("");
  const [theme, setTheme] = useState("sakura");
  const [existingTitle, setExistingTitle] = useState("");
  const [existingTheme, setExistingTheme] = useState("sakura");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchNotebook = async () => {
      try {
        const notebook = await getNotebook(notebookId);
        setTitle(notebook.title);
        setTheme(notebook.theme);
        setExistingTitle(notebook.title);
        setExistingTheme(notebook.theme);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNotebook();
  }, [notebookId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const themeStyle = themeStyles[theme];

    // Check for changes
    if (title === existingTitle && themeStyle === themeStyles[existingTheme]) {
      onClose();
      return;
    }

    try {
      await updateNotebook(notebookId, { title, theme: themeStyle });
      onUpdate({ _id: notebookId, title, theme: themeStyle });
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <h2>Update Notebook</h2>
        <form className="notebook-form" onSubmit={handleSubmit}>
          <label>
            Title:
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </label>

          <div className="theme-selector">
            <label>Theme:</label>
            <div className="theme-buttons">
              {Object.keys(themeStyles).map((themeKey) => (
                <button
                  key={themeKey}
                  type="button" // Prevent form submission
                  onClick={() => setTheme(themeKey)} // Set the selected theme
                  className={theme === themeKey ? "active" : ""}
                  style={{
                    background: themeStyles[themeKey], // Apply the theme background
                    color: theme === themeKey ? "white" : "black", // Change text color when active
                  }}
                >
                  {themeKey
                    .replace(/([A-Z])/g, " ") // Add spaces to camel case names
                    .replace(/^\w/, (c) => c.toUpperCase())}
                </button>
              ))}
            </div>
          </div>

          <div
            className="theme-preview"
            style={{
              backgroundImage: themeStyles[theme], // Use the actual theme style
              width: "100%",
              height: "100px",
              marginTop: "10px",
              borderRadius: "8px",
              border: "1px solid #ccc",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></div>

          <div className="buttns">
            <button type="button" onClick={onClose}>
              Cancel
            </button>
            <button className="ad-c" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UpdateNotebook;
