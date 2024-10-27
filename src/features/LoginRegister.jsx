import React, { useState } from "react";
import "./css/LoginRegister.css";
import { useNavigate } from "react-router-dom";

const LoginRegister = () => {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    loginName: "",
    loginPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();

    navigate("/dashboard");
  };
  return (
    <div className="container">
      <header className="login-app-header">
        <div className="login-header-left">
          <img
            src="https://res.cloudinary.com/djbz2ydtp/image/upload/v1729576586/tailor_qhvby4.jpg"
            alt="tailor logo"
            className="login-logo"
          />
          <div className="login-header-text">
            <h1>Pocket Tailor</h1>
            <p className="login-slogan">
              ..."Sew with love, stitch with care."
            </p>
          </div>
        </div>
      </header>

      <div className="toggle">
        <button
          onClick={() => setIsRegister(true)}
          className={isRegister ? "active" : ""}
        >
          Register
        </button>
        <button
          onClick={() => setIsRegister(false)}
          className={!isRegister ? "active" : ""}
        >
          Login
        </button>
      </div>

      <div className="form-container">
        {isRegister ? (
          <form className="form">
            <h2>Register</h2>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        ) : (
          <form className="form">
            <h2>Login</h2>
            <input
              type="text"
              name="loginName"
              placeholder="Name"
              value={formData.loginName}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="loginPassword"
              placeholder="Password"
              value={formData.loginPassword}
              onChange={handleChange}
              required
            />
            <button type="submit" onClick={handleLogin}>
              Login
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginRegister;
