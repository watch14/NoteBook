import { useState } from "react";

import "./App.css";
import Header from "./components/header";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <h1>Home Page</h1>
    </>
  );
}

export default App;
