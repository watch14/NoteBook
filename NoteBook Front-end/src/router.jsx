import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"; // Main App layout with Header

import Login from "./components/Login.jsx"; // Login Component
import Register from "./components/Register.jsx"; // Register Component

import Notebooks from "./components/Notebooks.jsx";
import KeyboardJP from "./components/Keyboard.jsx"; // Keyboard Component
import TextPage from "./components/TextPage.jsx";
import Sketch from "./components/sketch.jsx";
import Page from "./components/page.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app with header and outlet
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/notebooks", element: <Notebooks /> },
      { path: "/keyboard", element: <KeyboardJP /> },
      { path: "/text", element: <TextPage /> },
      { path: "/sketch", element: <Sketch /> },

      { path: "/page/:id", element: <Page /> },
    ],
  },
]);

export default router;
