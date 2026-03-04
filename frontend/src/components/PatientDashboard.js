


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