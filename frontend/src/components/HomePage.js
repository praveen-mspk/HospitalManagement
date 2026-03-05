 import "./HomePage.css";

import React from "react";
import { useNavigate } from "react-router-dom";
import "./HomePage.css";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <h1>Hospital Management System</h1>

      <div className="button-group">
        <button onClick={() => navigate("/patient-login")}>
          Patient
        </button>

        <button onClick={() => navigate("/doctor-login")}>
          Doctor
        </button>

        <button onClick={() => navigate("/admin-login")}>
          Admin
        </button>
      </div>
    </div>
  );
}

export default HomePage;