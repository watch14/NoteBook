// Loader.jsx
import React from "react";
import { PuffLoader } from "react-spinners";

import "../css/loader.css";

const Loader = () => {
  return (
    <div className="loader-container">
      <PuffLoader color="#E60012" size={140} />
    </div>
  );
};

export default Loader;
