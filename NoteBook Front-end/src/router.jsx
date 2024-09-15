import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"; // Main App layout with Header
import KeyboardJP from "./components/Keyboard.jsx"; // Keyboard Component
import Contact from "./routes/Contact.jsx"; // Contact Component
import Login from "./components/Login.jsx"; // Login Component
import Register from "./components/Register.jsx"; // Register Component

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app with header and outlet
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/keyboard", element: <KeyboardJP /> },
      { path: "/contact", element: <Contact /> },
    ],
  },
]);

export default router;
