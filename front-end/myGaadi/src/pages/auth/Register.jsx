// pages/auth/Register.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/user";
import "../../Style/Register.css";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const navigate = useNavigate();

  const onBack = () => {
    navigate("/");
  };

  const onRegister = async () => {
    if (!name) return toast.warn("Please enter your name");
    if (!email) return toast.warn("Please enter your email");
    if (!phoneNo) return toast.warn("Please enter your phone number");
    if (!password) return toast.warn("Please enter your password");
    if (!confirmPassword) return toast.warn("Please confirm your password");
    if (password !== confirmPassword)
      return toast.warn("Passwords do not match");

    const result = await registerUser(
      name,
      email,
      phoneNo,
      password,
      confirmPassword
    );

    if (result.status === "success") {
      toast.success("Successfully registered!");
      navigate("/");
    } else if (result.status === "error") {
      const errors = result.errors;

      if (typeof errors === "string") {
        toast.error(errors); // if backend returns a string message
      } else {
        Object.entries(errors).forEach(([field, message]) => {
          toast.error(`${field}: ${message}`);
        });
      }
    }
  };

  return (
    <div className="register-page">
      <div className="window">
        <span className="h1">Register</span>
        <form>
          <input
            type="text"
            className="mt-4 form-control"
            placeholder="Enter Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="email"
            className="mt-4 form-control"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="tel"
            className="mt-4 form-control"
            placeholder="Enter PhoneNo"
            value={phoneNo}
            onChange={(e) => setPhoneNo(e.target.value)}
          />
          <input
            type="password"
            className="mt-4 form-control"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            className="mt-4 form-control"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={onRegister}
            className="mt-4 btn btn-light mt-2 regbtn"
          >
            Register
          </button>

          <p>
            Do you have an account?{" "}
            <button type="button" onClick={onBack} className="text-warning">
              Login
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Register;
