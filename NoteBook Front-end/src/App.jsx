// src/App.js
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./theme.css"; // Ensure the theme styles are loaded

function App() {
  return (
    <ThemeProvider>
      <Header />
      <div className="card">
        <Outlet />
      </div>
    </ThemeProvider>
  );
}

export default App;
