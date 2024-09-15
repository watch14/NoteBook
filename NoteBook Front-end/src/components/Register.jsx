import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Api } from "../utils/api";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  useEffect(() => {
    // Check if password is at least 6 characters
    if (password && password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
    } else if (password !== confirmPassword) {
      setPasswordError("Passwords do not match.");
    } else {
      setPasswordError("");
    }
  }, [password, confirmPassword]);

  async function register(e) {
    e.preventDefault();
    setError("");

    if (passwordError) {
      setError(passwordError);
      return;
    }

    try {
      const response = await axios.post(Api + "users/register", {
        userName: username,
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data);

        window.location.href = "/login";
      } else {
        setError(response.data.message);
        alert(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error during register:",
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
      <h1>Register</h1>

      <form onSubmit={register}>
        <input
          type="text"
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)} // Sync input with password state
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)} // Sync input with confirmPassword state
          placeholder="Confirm Password"
        />
        {/* Show password validation error dynamically */}
        {passwordError && <p className="error">{passwordError}</p>}
        {error && <p className="error">{error}</p>}{" "}
        <input type="submit" value="Register" />
      </form>

      <p>OR</p>

      <Link to="/login">Login</Link>
    </div>
  );
}

export default Register;
