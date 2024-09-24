import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveUserToLocalStorage, isUserLoggedIn } from "../utils/auth";
import { Api } from "../utils/api";

import "../css/login.css";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function login(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(Api + "users/login", {
        userName: username,
        password,
      });

      if (response.data.success) {
        console.log(response.data);

        // Save user ID and token to local storage
        const { userId, token } = response.data.data;
        saveUserToLocalStorage(userId, token);

        //////////////////////////////////////
        window.location.href = "/";
      } else {
        // Display error message from API response
        setError(response.data.message);
        alert(response.data.message); // Optional: Alert for user feedback
      }
    } catch (error) {
      console.error(
        "Error during login:",
        error.response ? error.response.data.message : error.message
      );
      setError(
        error.response
          ? error.response.data.message
          : "An unexpected error occurred. Please try again."
      );
    }
  }

  return (
    <div className="login">
      <div className="left-side">
        <h1>JP.NoteBook</h1>
      </div>
      <div className="mid-side"></div>
      <div className="right-side">
        <div className="lll">
          <h2>Login</h2>
          <form onSubmit={login}>
            <p>Username or Email:</p>
            <input
              type="text"
              value={username} // Sync input with state
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Username or Email"
            />
            <p>Password:</p>
            <input
              type="password"
              value={password} // Sync input with state
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            {error && <p className="error">{error}</p>}
            <Link className="forget">Forget Password?</Link>
            <button className="login-btn" type="submit" value="Login">
              Login
            </button>
          </form>
          <br />
          <Link className="l-register-bnt" to="/register">
            Register
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
