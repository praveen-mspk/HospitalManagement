// import { useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {
//   const { role } = useParams();
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = () => {
//     if (!email || !password) {
//       alert("Please enter email and password");
//       return;
//     }

//     if (role === "doctor") {
//       navigate("/doctor-dashboard");
//     } else if (role === "patient") {
//       navigate("/patient-dashboard");
//     } else if (role === "admin") {
//       navigate("/admin-dashboard");
//     }
//   };

//   return (
//     <div className="login-container">
//       <h2>{role.toUpperCase()} Login</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Enter Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }

// export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // Hardcoded Admin
//     if (email === "admin@hospital.com" && password === "admin123") {
//       navigate("/admin");
//       return;
//     }

//     // Hardcoded Doctor
//     if (email === "doctor@hospital.com" && password === "doctor123") {
//       navigate("/doctor");
//       return;
//     }

//     // Patient check from localStorage
//     const patient = JSON.parse(localStorage.getItem("patient"));

//     if (patient && patient.email === email && patient.password === password) {
//       navigate("/patient");
//       return;
//     }

//     alert("Invalid Credentials");
//   };

//   return (
//     <div className="login-container">
//       <h2>Hospital Management System</h2>

//       <form onSubmit={handleLogin}>
//         <input
//           type="email"
//           placeholder="Enter Email"
//           required
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <input
//           type="password"
//           placeholder="Enter Password"
//           required
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button type="submit">Login</button>
//       </form>

//       <button className="signup-btn" onClick={() => navigate("/signup")}>
//         Signup (Patient Only)
//       </button>
//     </div>
//   );
// }

// export default LoginPage;



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {

//   const navigate = useNavigate();
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = (e) => {
//     e.preventDefault();

//     // 1️⃣ Admin
//     if (email === "admin@hospital.com" && password === "admin123") {
//       navigate("/admin");
//       return;
//     }

//     // 2️⃣ Doctor
//     if (email === "doctor@hospital.com" && password === "doctor123") {
//       navigate("/doctor");
//       return;
//     }

//     // 3️⃣ Patient
//     const patient = JSON.parse(localStorage.getItem("patient"));

//     if (patient && patient.email === email && patient.password === password) {
//       navigate("/patient");
//       return;
//     }

//     alert("Invalid Credentials");
//   };

//   return (
//     <div className="login-wrapper">
//       <div className="login-container">
//         <h2>Hospital Management System</h2>

//         <form onSubmit={handleLogin}>
//           <input
//             type="email"
//             placeholder="Enter Email"
//             required
//             onChange={(e) => setEmail(e.target.value)}
//           />

//           <input
//             type="password"
//             placeholder="Enter Password"
//             required
//             onChange={(e) => setPassword(e.target.value)}
//           />

//           <button type="submit">Login</button>
//         </form>

//         <button className="signup-btn" onClick={() => navigate("/signup")}>
//           Signup (Patient Only)
//         </button>
//       </div>
//     </div>
//   );
// }

// export default LoginPage;


// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage.css";

// function LoginPage() {
//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [showSignup, setShowSignup] = useState(false);

//   // Only predefined users
//   const predefinedUsers = [
//     { email: "admin@hospital.com", password: "admin123", role: "ADMIN" },
//     { email: "doctor1@hospital.com", password: "doc123", role: "DOCTOR" },
//     { email: "doctor2@hospital.com", password: "doc456", role: "DOCTOR" }
//   ];

//   const handleLogin = () => {
//     // 1️⃣ Check admin/doctor
//     const predefinedUser = predefinedUsers.find(
//       (u) => u.email === email && u.password === password
//     );

//     if (predefinedUser) {
//       localStorage.setItem("role", predefinedUser.role);
//       localStorage.setItem("email", predefinedUser.email);

//       if (predefinedUser.role === "ADMIN") navigate("/admin");
//       if (predefinedUser.role === "DOCTOR") navigate("/doctor");
//       return;
//     }

//     // 2️⃣ Check patient from localStorage
//     const patients = JSON.parse(localStorage.getItem("patients")) || [];

//     const patientUser = patients.find(
//       (p) => p.email === email && p.password === password
//     );

//     if (patientUser) {
//       localStorage.setItem("role", "PATIENT");
//       localStorage.setItem("email", patientUser.email);
//       navigate("/patient");
//       return;
//     }

//     // 3️⃣ If not found → show signup button
//     setShowSignup(true);
//   };

//   return (
//     <div className="login-container">
//       <h2>Hospital Management System</h2>

//       <input
//         type="email"
//         placeholder="Enter Email"
//         onChange={(e) => setEmail(e.target.value)}
//       />

//       <input
//         type="password"
//         placeholder="Enter Password"
//         onChange={(e) => setPassword(e.target.value)}
//       />

//       <button onClick={handleLogin}>Login</button>

//       {showSignup && (
//         <button
//           style={{ marginTop: "10px", backgroundColor: "green" }}
//           onClick={() => navigate("/signup")}
//         >
//           New Patient? Sign Up
//         </button>
//       )}
//     </div>
//   );
// }

// export default LoginPage;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showSignup, setShowSignup] = useState(false);

  // Predefined users (Admin & Doctors only)
  const predefinedUsers = [
    { email: "admin@hospital.com", password: "admin123", role: "ADMIN" },
    { email: "doctor1@hospital.com", password: "doc123", role: "DOCTOR" },
    { email: "doctor2@hospital.com", password: "doc456", role: "DOCTOR" }
  ];

  const handleLogin = () => {
    const enteredEmail = email.trim().toLowerCase();
    const enteredPassword = password.trim();

    // 1️⃣ Check predefined users
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

    // 2️⃣ Check patients from localStorage
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

    // 3️⃣ If nothing matched
    alert("Invalid credentials");
    setShowSignup(true);
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

      {showSignup && (
        <button
          className="signup-btn"
          onClick={() => navigate("/signup")}
        >
          New Patient? Sign Up
        </button>
      )}
    </div>
  );
}

export default LoginPage;