import React, { useState } from "react";
import "./Login.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const [loginDetails, setLoginDetails] = useState({
    phoneNumber: "",
    password: "",
  });

  const handleLoginForm = (e) => {
    const { name, value } = e.target;
    setLoginDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate("/home");
  };

  return (
    <div className="login-page">
      <span className="login-wave"></span>
      <div className="login-container">
        <div className="login-box">
          <form action="">
            <h1>Login</h1>
            <div className="login-form">
              <div className="input-box">
                <input
                  type="text"
                  name="phoneNumber"
                  value={loginDetails.phoneNumber}
                  onChange={handleLoginForm}
                  required="required"
                />
                <span>
                  <FontAwesomeIcon icon={faUser} /> Phone Number
                </span>
                <i></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  value={loginDetails.password}
                  onChange={handleLoginForm}
                  required="required"
                />
                <span>
                  <FontAwesomeIcon icon={faLock} /> Password
                </span>
                <i></i>
              </div>
            </div>
            <button
              className="login-button"
              type="submit"
              onClick={handleSubmit}
            >
              Login
            </button>

            <span className="line-login"></span>
            <div className="register-link">
              <p>
                Don't have an account? <Link to="/register">Register</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
