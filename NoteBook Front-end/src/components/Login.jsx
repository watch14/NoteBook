import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const URL = "http://localhost:5000/api/";

function Login() {
  const [username, setUserName] = useState(""); // Corrected variable name
  const [password, setPassword] = useState("");

  async function login(e) {
    e.preventDefault();

    try {
      const response = await axios.post(URL + "users/login", {
        userName: username, // Change this to match the backend
        password,
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error during login:", error.message);
    }
  }

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={login}>
        <input
          type="text"
          value={username} // Sync input with state
          onChange={(e) => setUserName(e.target.value)}
          placeholder="Username"
        />
        <input
          type="password"
          value={password} // Sync input with state
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <input type="submit" value="Login" />
      </form>
      <br />
      <p>OR</p>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
