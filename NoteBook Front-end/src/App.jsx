// src/App.js
import { Outlet } from "react-router-dom";
import Header from "./components/header";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css"; // Ensure the theme styles are loaded
import Footer from "./components/Footer";

function App() {
  return (
    <ThemeProvider>
      <Header />
      <div className="card">
        <Outlet />
      </div>
      <Footer />
    </ThemeProvider>
  );
}

export default App;
