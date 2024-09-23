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
      {
        path: "/login",
        element: <ProtectedRoute element={<Login />} isRestricted={true} />,
      },
      {
        path: "/register",
        element: <ProtectedRoute element={<Register />} isRestricted={true} />,
      },
      { path: "/", element: <HomePage /> },
      {
        path: "/notebooks",
        element: (
          <ProtectedRoute element={<Notebooks />} isRestricted={false} />
        ),
      },
      { path: "/keyboard", element: <Keyboard /> },

      {
        path: "/traslate",
        element: (
          <ProtectedRoute element={<Translate />} isRestricted={false} />
        ),
      },
      {
        path: "/text",
        element: <ProtectedRoute element={<TextPage />} isRestricted={false} />,
      },
      {
        path: "/sketch",
        element: <ProtectedRoute element={<Sketch />} isRestricted={false} />,
      },
      {
        path: "/page/:id",
        element: <ProtectedRoute element={<Page />} isRestricted={false} />,
      },
    ],
  },
]);

export default router;
