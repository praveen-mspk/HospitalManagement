// function PatientDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Patient Dashboard</h2>
//     </div>
//   );
// }

// export default PatientDashboard;

// function PatientDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Welcome to Patient Dashboard</h2>
//     </div>
//   );
// }

// export default PatientDashboard;


// function PatientDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Patient Dashboard</h2>
//     </div>
//   );
// }

// export default PatientDashboard;

// function PatientDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Patient Dashboard</h2>
//     </div>
//   );
// }

// export default PatientDashboard;


import React from "react";

function PatientDashboard() {
  const email = localStorage.getItem("email");

  return (
    <div>
      <h2>Patient Dashboard</h2>
      <h3>Welcome {email}</h3>
    </div>
  );
}

export default PatientDashboard;