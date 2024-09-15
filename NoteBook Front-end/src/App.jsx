import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="content">
        <Outlet />{" "}
      </div>
    </>
  );
}

export default App;
