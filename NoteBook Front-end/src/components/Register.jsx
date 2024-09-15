import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { saveUserToLocalStorage, isUserLoggedIn } from "../utils/auth";

const URL = "http://localhost:5000/api/";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  async function register(e) {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post(URL + "users/register", {
        userName: username,
        email,
        password,
      });

      if (response.data.success) {
        console.log(response.data);

        //////////////////////////////////////
        // window.location.href = "/login";
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
          onChange={(e) => {
            setUsername(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          type="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          placeholder="Email"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Confirm Password"
        />
        {error && <p className="error">{error}</p>} <input type="submit" />
      </form>

      <p>OR</p>

      <Link to="/login">login</Link>
    </div>
  );
}

export default Register;
