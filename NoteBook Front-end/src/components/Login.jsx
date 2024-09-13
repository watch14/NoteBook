import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveUserToLocalStorage, isUserLoggedIn } from "../utils/auth"; // Import the utility function

const URL = "http://localhost:5000/api/";

function Login() {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // State for handling error messages

  async function login(e) {
    e.preventDefault();
    setError(""); // Reset error message before each attempt

    try {
      const response = await axios.post(URL + "users/login", {
        userName: username,
        password,
      });

      if (response.data.success) {
        console.log(response.data);

        // Save user ID and token to local storage
        const { user, token } = response.data.data;
        saveUserToLocalStorage(user._id, token);

        if (isUserLoggedIn()) {
          alert("Login successful and user is logged in.");
        } else {
          alert("Login successful but user is not logged in.");
        }

        //////////////////////////////////////
        // Redirect or handle successful login
        // window.location.href = "/";
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
      {error && <p className="error">{error}</p>} {/* Display error message */}
      <br />
      <p>OR</p>
      <br />
      <Link to="/register">Register</Link>
    </div>
  );
}

export default Login;
