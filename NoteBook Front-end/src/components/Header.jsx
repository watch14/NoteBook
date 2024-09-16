import React from "react";
import { Link } from "react-router-dom";
import { isUserLoggedIn, clearUserFromLocalStorage } from "../utils/auth"; // Import login utilities

import "../css/header.css";

function Header() {
  const handleLogout = () => {
    clearUserFromLocalStorage(); // Clear user data from local storage
    window.location.href = "/login"; // Redirect to login page
  };

  return (
    <header>
      <div>
        <Link to="/">JP.NoteBook</Link>
      </div>
      <nav>
        <Link to="/">Home</Link>

        <Link to="/notebooks">NoteBook</Link>
        <Link to="/keyboard">Keyboard</Link>
        <Link to="/text">Text</Link>
        <Link to="/sketch">Sketch</Link>
        <Link to="/page">Page</Link>

        {isUserLoggedIn() ? (
          <button onClick={handleLogout}>Logout</button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
}

export default Header;
