import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const predefinedUsers = [
    { email: "admin@hospital.com", password: "admin123", role: "ADMIN" },
    { email: "doctor1@hospital.com", password: "doc123", role: "DOCTOR" },
    { email: "doctor2@hospital.com", password: "doc456", role: "DOCTOR" }
  ];

  const handleLogin = () => {
    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password.trim();

    // Check admin & doctors
    const predefinedUser = predefinedUsers.find(
      (user) =>
        user.email.toLowerCase() === enteredEmail &&
        user.password === enteredPassword
    );

    if (predefinedUser) {
      localStorage.setItem("role", predefinedUser.role);
      localStorage.setItem("email", predefinedUser.email);

      if (predefinedUser.role === "ADMIN") navigate("/admin");
      if (predefinedUser.role === "DOCTOR") navigate("/doctor");
      return;
    }

    // Check patients
    const patients =
      JSON.parse(localStorage.getItem("patients")) || [];

    const patientUser = patients.find(
      (patient) =>
        patient.email.toLowerCase() === enteredEmail &&
        patient.password === enteredPassword
    );

    if (patientUser) {
      localStorage.setItem("role", "PATIENT");
      localStorage.setItem("email", patientUser.email);
      navigate("/patient");
      return;
    }

    alert("Invalid credentials");
  };

  return (
    <div className="login-container">
      <h2>Hospital Management System</h2>

      <input
        type="email"
        placeholder="Enter Email"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Enter Password"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleLogin}>Login</button>

      {/* ✅ Always visible signup button */}
      <button
        className="signup-btn"
        onClick={() => navigate("/signup")}
      >
        New Patient? Sign Up
      </button>
    </div>
  );
}

export default LoginPage;