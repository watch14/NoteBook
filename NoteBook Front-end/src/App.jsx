import { Outlet, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import { ThemeProvider } from "./context/ThemeContext";
import "./App.css";
import Footer from "./components/Footer";
import Loader from "./utils/Loader";

function App() {
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [location]);

  return (
    <ThemeProvider>
      {loading ? (
        <Loader />
      ) : (
        <div className="card">
          <Header />
          <Outlet />
          <Footer />
        </div>
      )}
    </ThemeProvider>
  );
}

export default App;
