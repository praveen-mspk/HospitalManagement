 import "./HomePage.css";
// import { useNavigate } from "react-router-dom";

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       <h1 className="home-title">Hospital Management System</h1>

//       <div className="button-group">
//         <button onClick={() => navigate("/login/doctor")} className="home-btn">
//           Doctor
//         </button>

//         <button onClick={() => navigate("/login/admin")} className="home-btn">
//           Admin
//         </button>

//         <button onClick={() => navigate("/login/patient")} className="home-btn">
//           Patient
//         </button>
//       </div>
//     </div>
//   );
// }

// export default HomePage;



// import { useNavigate } from "react-router-dom";

// function HomePage() {
//   const navigate = useNavigate();

//   return (
//     <div className="home-container">
//       <h1>Hospital Management System</h1>

//       <button onClick={() => navigate("/patient-login")}>
//         Patient
//       </button>

//       <button>Doctor</button>
//       <button>Admin</button>
//     </div>
//   );
// }

// export default HomePage;


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