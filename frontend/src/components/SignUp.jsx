import React, { useState } from "react";
import "../CSS/SignU.css";
import axios from "axios";
import { Navigate } from "react-router-dom";

const SignUp = () => {
  const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${VITE_BASE_URL}/api/v1/auth/signup`, {
        name,
        email,
        password,
      });
      if (response.data.success) {
        <Navigate to="/dashboard" />;
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError("An error occurred");
      console.log(error.message);
    }
    setEmail("");
    setName("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <main>
      <form className="form" method="POST" onSubmit={handleSubmit}>
    {error && <div className="error">{error}</div>}
        <h1 className="heading">Sign Up</h1>
        <div className="main_content">
          <input
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
            placeholder="Enter Your Name"
            required
            name="name"
          />
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
            placeholder="Create Password"
            required
            autoComplete="off"
          />
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
            }}
            name="confirmPassword"
            placeholder="Confirm Password"
            required
            autoComplete="off"
          />
          <button type="submit">Sign Up</button>
        </div>
            <div className="already-account">
                <p>Already have an account? <a href="/login">Login</a></p>
            </div>
      </form>
    </main>
  );
};

export default SignUp;
