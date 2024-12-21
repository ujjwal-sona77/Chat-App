import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
const Login = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${VITE_BASE_URL}/api/v1/auth/signin`, {
        email,
        password
      });
      if (response.data.success) {
        navigate("/dashboard");
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred");
      console.log(error.message);
    }
    setEmail("");
    setPassword("");
  };
  return (
    <main>
      <form className="form" method="post" onSubmit={handleSubmit}>
        {error && <div className="error">{error}</div>}
        <h1 className="heading">Login</h1>
        <div className="main_content">
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="Enter Your Email"
            required
            name="email"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            name="password"
            placeholder="Enter  Password"
            required
            autoComplete="off"
          />
          <button type="submit">Log IN</button>
        </div>
        <div className="already-account">
          <p>
            Create an Account <a href="/">Sign Up</a>
          </p>
        </div>
      </form>
    </main>
  );
};

export default Login;
