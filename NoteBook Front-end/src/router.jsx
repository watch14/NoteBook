import { createBrowserRouter } from "react-router-dom";
import App from "./App.jsx"; // Main App layout with Header
import ScrollToTop from "./utils/ScrollToTop.jsx"; // Import ScrollToTop Component

import Login from "./components/Login.jsx";
import Register from "./components/Register.jsx";
import Notebooks from "./components/Notebooks.jsx";
import Keyboard from "./components/keyboard.jsx";
import TextPage from "./components/TextPage.jsx";
import Sketch from "./components/sketch.jsx";
import Page from "./components/page.jsx";
import Translate from "./components/Trasnlate.jsx";
import HomePage from "./components/HomePage.jsx";
import ProtectedRoute from "./utils/ProtectedRoute.jsx";
import NotFound from "./components/NotFound.jsx";
import About from "./components/About.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <ScrollToTop />
        <App />
      </>
    ),
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
      {
        path: "/about",
        element: <ProtectedRoute element={<About />} isRestricted={false} />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);

export default router;
