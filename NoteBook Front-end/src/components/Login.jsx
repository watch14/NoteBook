import React from "react";

const Login = () => {
  const [email, setEmail] = useState("");

  return (
    <div className="login">
      <h1>login</h1>

      <form action="POST">
        <input
          type="text"
          onChange={(e) => {
            setuserName(e.target.value);
          }}
          placeholder="Username"
        />
        <input
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          placeholder="Password"
        />

        <input type="submit" />
      </form>

      <br />
      <p>OR</p>
      <br />
    </div>
  );
};

export default Login;
