import React, { createContext, useState, useEffect } from "react";

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    // Remove any previously added theme stylesheets
    const existingStylesheet = document.getElementById("theme-stylesheet");
    if (existingStylesheet) {
      existingStylesheet.remove();
    }

    // Create a new stylesheet link element
    const link = document.createElement("link");
    link.id = "theme-stylesheet";
    link.rel = "stylesheet";
    link.href =
      theme === "dark" ? "/css/dark-theme.css" : "/css/light-theme.css";
    document.head.appendChild(link);

    // Save the theme to localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
