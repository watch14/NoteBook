import { useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./components/Header";

function App() {
  return (
    <>
      <Header />
      <div className="card">
        <Outlet />{" "}
      </div>
    </>
  );
}

export default App;
