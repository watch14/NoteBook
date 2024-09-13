import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <Link to="/">Home</Link>
      <Link to="/keyboard">keyboard</Link>
      <Link to="/contact">contact</Link>
      <p></p>
      <Link to="/login">login</Link>
      <Link to="/register">Regiser</Link>
    </div>
  );
};

export default Header;
