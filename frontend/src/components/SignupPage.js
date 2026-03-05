import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function SignupPage() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    email: "",
    password: "",
    confirmPassword: "",
    mobile: ""
  });

  // Email validation
  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Mobile validation (10 digits)
  const validateMobile = (mobile) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(mobile);
  };

  // Strong password validation
  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{6,}$/;
    return regex.test(password);
  };

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    return today.getFullYear() - birthDate.getFullYear();
  };

  const handleSubmit = () => {
    const {
      name,
      dob,
      gender,
      email,
      password,
      confirmPassword,
      mobile
    } = formData;

    // Required fields
    if (!name || !dob || !gender || !email || !password || !confirmPassword || !mobile) {
      alert("All fields are required");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid Email format");
      return;
    }

    if (!validateMobile(mobile)) {
      alert("Mobile number must be 10 digits");
      return;
    }

    if (!validatePassword(password)) {
      alert(
        "Password must contain at least 6 characters, one uppercase, one lowercase and one number"
      );
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const age = calculateAge(dob);
    if (age < 1) {
      alert("Invalid Date of Birth");
      return;
    }

    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    const existingUser = patients.find(
      (p) => p.email.toLowerCase() === email.toLowerCase()
    );

    if (existingUser) {
      alert("Email already registered. Please login.");
      navigate("/");
      return;
    }

    patients.push(formData);
    localStorage.setItem("patients", JSON.stringify(patients));

    alert("Signup Successful. Please Login.");
    navigate("/");
  };

  return (
    <div className="login-container">
      <h2>Patient Signup</h2>

      <input
        type="text"
        placeholder="Full Name"
        onChange={(e) =>
          setFormData({ ...formData, name: e.target.value })
        }
      />

      <input
        type="date"
        onChange={(e) =>
          setFormData({ ...formData, dob: e.target.value })
        }
      />

      <div className="radio-group">
        <label>
          <input
            type="radio"
            name="gender"
            value="Male"
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          /> Male
        </label>

        <label>
          <input
            type="radio"
            name="gender"
            value="Female"
            onChange={(e) =>
              setFormData({ ...formData, gender: e.target.value })
            }
          /> Female
        </label>
      </div>

      <input
        type="email"
        placeholder="Email"
        onChange={(e) =>
          setFormData({ ...formData, email: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        onChange={(e) =>
          setFormData({ ...formData, password: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Confirm Password"
        onChange={(e) =>
          setFormData({
            ...formData,
            confirmPassword: e.target.value
          })
        }
      />

      <input
        type="text"
        placeholder="Mobile Number"
        onChange={(e) =>
          setFormData({ ...formData, mobile: e.target.value })
        }
      />

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default SignupPage;