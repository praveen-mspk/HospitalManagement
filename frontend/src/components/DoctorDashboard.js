function DoctorDashboard() {
  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Doctor Dashboard</h2>
    </div>
  );
}

export default DoctorDashboard;

// function DoctorDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Doctor Dashboard</h2>
//     </div>
//   );
// }

// export default DoctorDashboard;

// function DoctorDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Doctor Dashboard</h2>
//     </div>
//   );
// }

// export default DoctorDashboard;


// function DoctorDashboard() {
//   return (
//     <div style={{ textAlign: "center", marginTop: "100px" }}>
//       <h2>Doctor Dashboard</h2>
//     </div>
//   );
// }

// export default DoctorDashboard;

//import React from "react";

// function DoctorDashboard() {
//   const email = localStorage.getItem("email");

//   const doctorData = {
//     "doctor1@hospital.com": {
//       name: "Dr. Priya",
//       specialization: "Cardiologist",
//       patients: ["Ramesh", "Sita"]
//     },
//     "doctor2@hospital.com": {
//       name: "Dr. Arjun",
//       specialization: "Neurologist",
//       patients: ["Kumar", "Lakshmi"]
//     }
//   };

//   const doctor = doctorData[email];

//   if (!doctor) {
//     return <h2>Unauthorized Access</h2>;
//   }

//   return (
//     <div>
//       <h2>Doctor Dashboard</h2>
//       <h3>Name: {doctor.name}</h3>
//       <h4>Specialization: {doctor.specialization}</h4>

//       <h4>Patients:</h4>
//       <ul>
//         {doctor.patients.map((p, index) => (
//           <li key={index}>{p}</li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default DoctorDashboard;

// import React from "react";

// function DoctorDashboard() {
//   const email = localStorage.getItem("email");

//   const doctorData = {
//     "doctor1@hospital.com": {
//       name: "Dr. Priya",
//       specialization: "Cardiologist",
//       patients: ["Ramesh", "Sita"]
//     },
//     "doctor2@hospital.com": {
//       name: "Dr. Arjun",
//       specialization: "Neurologist",
//       patients: ["Kumar", "Lakshmi"]
//     }
//   };

//   const doctor = doctorData[email];

//   if (!doctor) {
//     return (
//       <div style={{ textAlign: "center", marginTop: "100px" }}>
//         <h2>Unauthorized Access</h2>
//       </div>
//     );
//   }

//   return (
//     <div
//       style={{
//         textAlign: "center",
//         marginTop: "80px",
//         padding: "20px"
//       }}
//     >
//       <h2>Doctor Dashboard</h2>

//       <div
//         style={{
//           marginTop: "30px",
//           display: "inline-block",
//           padding: "30px",
//           borderRadius: "10px",
//           boxShadow: "0 5px 15px rgba(0,0,0,0.2)",
//           backgroundColor: "#ffffff"
//         }}
//       >
//         <h3>{doctor.name}</h3>
//         <p><strong>Specialization:</strong> {doctor.specialization}</p>

//         <h4 style={{ marginTop: "20px" }}>Patients</h4>

//         <ul style={{ listStyleType: "none", padding: 0 }}>
//           {doctor.patients.map((p, index) => (
//             <li key={index} style={{ margin: "8px 0" }}>
//               {p}
//             </li>
//           ))}
//         </ul>
//       </div>
//     </div>
//   );
// }

// export default DoctorDashboard;