import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/keyboard">keyboard</Link>
      <Link to="/contact">contact</Link>
    </div>
  );
};

export default Header;
