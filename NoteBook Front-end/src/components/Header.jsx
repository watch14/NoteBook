// src/components/Header.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isUserLoggedIn, clearUserFromLocalStorage } from "../utils/auth";
import "../css/header.css"; // Import your header styles

function Header() {
  const { theme, toggleTheme } = useContext(ThemeContext);

  const handleLogout = () => {
    clearUserFromLocalStorage();
    window.location.href = "/login";
  };

  return (
    <header>
      <div className="navi">
        <div className="logo">
          <Link to="/">JP.NoteBook</Link>
        </div>
        <nav className="navs">
          <Link to="/">Home</Link>
          <Link to="/notebooks">NoteBook</Link>
          <Link to="/keyboard">Keyboard</Link>
          <Link to="/traslate">Translate</Link>

          {isUserLoggedIn() ? (
            <button className="user" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          )}

          {/* Theme toggle button */}
          <button onClick={toggleTheme}>
            {theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
