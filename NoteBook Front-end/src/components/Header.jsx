import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isUserLoggedIn, clearUserFromLocalStorage } from "../utils/auth";
import { Sun, Moon, LogOut, Plus, CirclePlus } from "lucide-react"; // Import Plus icon for creating notebooks
import { Api } from "../utils/api"; // Import API functions
import AddNotebook from "./AddNotebook"; // Import the AddNotebook popup
import { getUserId } from "../utils/auth"; // Import the userId function
import "../css/header.css"; // Import your header styles

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [showAddPopup, setShowAddPopup] = useState(false); // State to show/hide the AddNotebook popup
  const [error, setError] = useState("");

  const handleLogout = () => {
    clearUserFromLocalStorage();
    window.location.href = "/login";
  };

  // Function to create a new page after notebook creation
  const createPageForNotebook = async (notebookId) => {
    try {
      const response = await Api.post(`pages/create`, {
        notebookId: notebookId,
        text: "<p></p>", // Default empty content for new page
        sketch: "[]", // Default empty sketch content
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      console.log("New page created for notebook:", notebookId);
    } catch (error) {
      console.error("Failed to create a new page:", error);
      setError(`Failed to create a new page: ${error.message}`);
    }
  };

  // Handler for adding a notebook
  const handleAddNotebook = async (newNotebook) => {
    const userId = getUserId();

    if (!userId) {
      setError("User not logged in. Please log in.");
      return;
    }

    try {
      const response = await Api.post(`notebooks/create`, {
        title: newNotebook.title,
        userId: userId,
        theme: newNotebook.theme,
      });

      if (response.data.error) {
        throw new Error(response.data.error);
      }

      const createdNotebook = response.data.data;

      // After notebook creation, create the first page for it
      await createPageForNotebook(createdNotebook._id);

      // Redirect to the newly created notebook page
      window.location.href = `/page/${createdNotebook._id}`;

      setShowAddPopup(false); // Hide the popup after creation
    } catch (err) {
      setError(`Failed to add notebook: ${err.message}`);
      console.error(err);
    }
  };

  return (
    <header>
      <div className="navi">
        <div className="logo">
          {/* <img src="/icone/notebook-logo.png" alt="" className="h-logo" /> */}
          <Link to="/">JP.NoteBook</Link>
        </div>
        <nav className="navs">
          {isUserLoggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/notebooks">NoteBook</Link>
              <Link to="/keyboard">Keyboard</Link>
              {/* Button to show the AddNotebook popup */}
              <a className="add" onClick={() => setShowAddPopup(true)}>
                <CirclePlus size={24} />
              </a>
              <button className="user" onClick={handleLogout}>
                <LogOut />
              </button>
            </>
          ) : (
            <>
              <Link to="/keyboard">Keyboard</Link>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          <button className="theme" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon size={20} /> // Show moon icon for dark mode
            ) : (
              <Sun Moon size={20} /> // Show sun icon for light mode
            )}
          </button>
        </nav>
      </div>

      {showAddPopup && (
        <AddNotebook
          onAdd={handleAddNotebook}
          onClose={() => setShowAddPopup(false)}
        />
      )}

      {error && <p className="error">{error}</p>}
    </header>
  );
}

export default Header;
