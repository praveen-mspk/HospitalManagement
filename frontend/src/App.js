import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import DoctorDashboard from "./components/DoctorDashboard";
import PatientDashboard from "./components/PatientDashboard";
import AdminDashboard from "./components/AdminDashboard";
  import PatientAuth from "./components/PatientAuth";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login/:role" element={<LoginPage />} />
        <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/patient-login" element={<PatientAuth />} />
        <Route path="/patient-dashboard" element={<PatientDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;


// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// import HomePage from "./components/HomePage";
// import PatientAuth from "./components/PatientAuth";
// import PatientDashboard from "./components/PatientDashboard";

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/patient-login" element={<PatientAuth />} />
//         <Route path="/patient-dashboard" element={<PatientDashboard />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;