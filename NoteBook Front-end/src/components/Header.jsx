import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/ThemeContext";
import { isUserLoggedIn, clearUserFromLocalStorage } from "../utils/auth";
import { Sun, Moon, LogOut } from "lucide-react"; // Import Sun and Moon icons
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
          {isUserLoggedIn() ? (
            <>
              <Link to="/">Home</Link>
              <Link to="/notebooks">NoteBook</Link>
              <Link to="/keyboard">Keyboard</Link>
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

          {/* Theme toggle button */}
          <button className="theme" onClick={toggleTheme}>
            {theme === "light" ? (
              <Moon size={20} /> // Show moon icon for dark mode
            ) : (
              <Sun size={20} /> // Show sun icon for light mode
            )}
          </button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
