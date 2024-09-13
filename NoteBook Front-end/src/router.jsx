import { createBrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import KeyboardJP from "./components/Keyboard.jsx";
import Contact from "./routes/Contact.jsx";

const router = createBrowserRouter([
  { path: "/", element: <App /> },
  { path: "/keyboard", element: <KeyboardJP /> },
  { path: "/contact", element: <Contact /> },
]);

export default router;
