import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import KeyboardJP from "./components/Keyboard.jsx";
import Contact from "./routes/Contact.jsx";
import Login from "./components/login.jsx";
import Register from "./components/Register.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },

  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },

  { path: "/keyboard", element: <KeyboardJP /> },
  { path: "/contact", element: <Contact /> },
]);

export default router;
