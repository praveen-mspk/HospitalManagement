// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import "./LoginPage";

// function SignupPage() {

//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: ""
//   });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSignup = (e) => {
//     e.preventDefault();

//     localStorage.setItem("patient", JSON.stringify(formData));
//     alert("Signup Successful!");
//     navigate("/");
//   };

//   return (
//     <div className="login-container">
//       <h2>Patient Signup</h2>

//       <form onSubmit={handleSignup}>
//         <input
//           type="text"
//           name="name"
//           placeholder="Full Name"
//           required
//           onChange={handleChange}
//         />

//         <input
//           type="email"
//           name="email"
//           placeholder="Email"
//           required
//           onChange={handleChange}
//         />

//         <input
//           type="password"
//           name="password"
//           placeholder="Password"
//           required
//           onChange={handleChange}
//         />

//         <button type="submit">Signup</button>
//       </form>
//     </div>
//   );
// }

// export default SignupPage;


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

  const calculateAge = (dob) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    return age;
  };

  const handleSubmit = () => {
    if (!formData.email || !formData.password) {
      alert("Email and Password are required");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const age = calculateAge(formData.dob);

    if (age < 1) {
      alert("Invalid Age");
      return;
    }

    let patients = JSON.parse(localStorage.getItem("patients")) || [];

    // 🔴 Check if email already exists
    const existingUser = patients.find(
      (p) => p.email === formData.email
    );

    if (existingUser) {
      alert("Email already registered. Please login.");
      navigate("/");
      return;
    }

    // ✅ Save new patient
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