import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx"; // Main App layout with Header
import Login from "./components/Login.jsx"; // Login Component
import Register from "./components/Register.jsx"; // Register Component
import Notebooks from "./components/Notebooks.jsx";
import Keyboard from "./components/Keyboard.jsx"; // Keyboard Component
import TextPage from "./components/TextPage.jsx";
import Sketch from "./components/sketch.jsx";
import Page from "./components/page.jsx";
import Translate from "./components/Trasnlate.jsx";
import HomePage from "./components/HomePage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />, // Main app with header and outlet
    children: [
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      { path: "/", element: <HomePage /> },
      {
        path: "/notebooks",
        element: <ProtectedRoute element={<Notebooks />} />,
      },
      { path: "/keyboard", element: <Keyboard /> },
      {
        path: "/traslate",
        element: <ProtectedRoute element={<Translate />} />,
      },
      { path: "/text", element: <ProtectedRoute element={<TextPage />} /> },
      { path: "/sketch", element: <ProtectedRoute element={<Sketch />} /> },
      { path: "/page/:id", element: <ProtectedRoute element={<Page />} /> },
    ],
  },
]);

export default router;
