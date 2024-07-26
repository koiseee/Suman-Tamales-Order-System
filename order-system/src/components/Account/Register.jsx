import React, { useState } from "react";
import "./Register.css";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const [registerDetails, setRegisterDetails] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    password: "",
    confirmPass: ""
  });

  const handleRegisterForm = (e) => {
    const { name, value } = e.target;
    setRegisterDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    alert("Account Registered")
    navigate("/login")
  }


  return (
    <div className="register-page">
      <span className="register-wave"></span>
      <div className="register-container">
        <div className="register-box">
          <form action="">
            <h1>Register</h1>
            <div className="register-form">
              <div className="input-box">
                <input
                  type="text"
                  name="firstName"
                  value={registerDetails.firstName}
                  onChange={handleRegisterForm}
                  required
                />
                <span>First Name
                </span>
                <i></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="lastName"
                  value={registerDetails.lastName}
                  onChange={handleRegisterForm}
                  required
                />
                <span>Last Name
                </span>
                <i></i>
              </div>
              <div className="input-box">
                <input
                  type="text"
                  name="phoneNumber"
                  value={registerDetails.phoneNumber}
                  onChange={handleRegisterForm}
                  required
                />
                <span> Phone Number
                </span>
                <i></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="password"
                  value={registerDetails.password}
                  required
                  onChange={handleRegisterForm}
                />
                <span>Password
                </span>
                <i></i>
              </div>
              <div className="input-box">
                <input
                  type="password"
                  name="confirmPass"
                  value={registerDetails.confirmPass}
                  required
                  onChange={handleRegisterForm}
                />
                <span>Confirm Password
                </span>
                <i></i>
              </div>
            </div>
            <button className="register-button" type="submit" onClick={handleSubmit}>
              Register
            </button>

            <div className="login-link">
              <p>
                Already have an account <Link to="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
