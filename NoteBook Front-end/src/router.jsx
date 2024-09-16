import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"; // Main App layout with Header

import Login from "./components/Login.jsx"; // Login Component
import Register from "./components/Register.jsx"; // Register Component

import Notebooks from "./components/Notebooks.jsx";
import KeyboardJP from "./components/Keyboard.jsx"; // Keyboard Component
import TextPage from "./components/TextPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app with header and outlet
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/notebooks", element: <Notebooks /> },
      { path: "/keyboard", element: <KeyboardJP /> },
      { path: "/page", element: <TextPage /> },
    ],
  },
]);

export default router;
