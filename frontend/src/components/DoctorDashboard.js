import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API = "http://localhost:8080/api";

function DoctorDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [activeTab, setActiveTab] = useState("appointments");
  const [appointments, setAppointments] = useState([]);
  const [alert, setAlert] = useState(null);
  const [loading, setLoading] = useState(false);

  const [slotForm, setSlotForm] = useState({ date: "", startTime: "", endTime: "" });

  useEffect(() => { fetchAppointments(); }, []);

  async function fetchAppointments() {
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");
    try {
      const res = await fetch(`${API}/appointments`, {
        credentials: "include",
        headers: {
          "X-User-Email": email,
          "X-User-Role": role
        }
      });
      if (res.ok) setAppointments(await res.json());
    } catch (e) { console.error(e); }
  }

  async function handleConfirm(id) {
    try {
      const res = await fetch(`${API}/doctor/appointments/${id}/confirm`, {
        method: "PUT", credentials: "include"
      });
      if (res.ok) { showAlert("Appointment confirmed!", "success"); fetchAppointments(); }
      else showAlert("Failed to confirm.", "error");
    } catch (e) { showAlert("Network error.", "error"); }
  }

  async function handleAddSlot(e) {
    e.preventDefault();
    setLoading(true);
    const doctorId = localStorage.getItem("userId");
    try {
      const res = await fetch(`${API}/doctor/${doctorId}/slots`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(slotForm)
      });
      if (res.ok) {
        showAlert("Slot added successfully!", "success");
        setSlotForm({ date: "", startTime: "", endTime: "" });
      } else showAlert("Failed to add slot.", "error");
    } catch (e) { showAlert("Network error.", "error"); }
    finally { setLoading(false); }
  }

  function showAlert(msg, type) {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3500);
  }

  function handleLogout() { localStorage.clear(); navigate("/"); }

  const booked = appointments.filter(a => a.status === "BOOKED").length;
  const confirmed = appointments.filter(a => a.status === "CONFIRMED").length;
  const completed = appointments.filter(a => a.status === "COMPLETED").length;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">🏥 <span>MediCore</span><br />Doctor Panel</div>
        <nav className="sidebar-nav">
          {[
            { key: "appointments", icon: "📋", label: "Appointments" },
            { key: "slots", icon: "🕐", label: "My Slots" },
          ].map(item => (
            <div
              key={item.key}
              className={`nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => setActiveTab(item.key)}
            >
              <span className="nav-icon">{item.icon}</span> {item.label}
            </div>
          ))}
        </nav>
        <div className="sidebar-footer">
          <div style={{ color: "#94a3b8", fontSize: "0.78rem", marginBottom: 10 }}>{email}</div>
          <button className="logout-btn" onClick={handleLogout}>Sign Out</button>
        </div>
      </aside>

      {/* Main */}
      <main className="main-content">
        {alert && <div className={`alert alert-${alert.type}`}>{alert.msg}</div>}

        {/* APPOINTMENTS */}
        {activeTab === "appointments" && (
          <>
            <div className="page-header">
              <h1>My Appointments</h1>
              <p>Review and confirm patient bookings</p>
            </div>

            <div className="stats-row">
              <div className="stat-card">
                <div className="stat-icon amber">⏳</div>
                <div className="stat-info"><p>Pending</p><h3>{booked}</h3></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon indigo">✅</div>
                <div className="stat-info"><p>Confirmed</p><h3>{confirmed}</h3></div>
              </div>
              <div className="stat-card">
                <div className="stat-icon green">🏁</div>
                <div className="stat-info"><p>Completed</p><h3>{completed}</h3></div>
              </div>
            </div>

            <div className="card">
              <div className="card-header"><h3>Appointment Requests</h3></div>
              <div className="card-body">
                {appointments.length === 0 ? (
                  <div className="empty-state">
                    <div className="empty-icon">📋</div>
                    <p>No appointments yet.</p>
                  </div>
                ) : (
                  <div className="table-wrap">
                    <table>
                      <thead>
                        <tr>
                          <th>#</th><th>Patient</th><th>Date</th>
                          <th>Time</th><th>Status</th><th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {appointments.map((a, i) => (
                          <tr key={a.id}>
                            <td>{i + 1}</td>
                            <td><strong>{a.patientName}</strong></td>
                            <td>{a.appointmentDate}</td>
                            <td>{a.startTime} – {a.endTime}</td>
                            <td><StatusBadge status={a.status} /></td>
                            <td>
                              {a.status === "BOOKED" && (
                                <button className="btn btn-success btn-sm" onClick={() => handleConfirm(a.id)}>
                                  Confirm
                                </button>
                              )}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* SLOTS */}
        {activeTab === "slots" && (
          <>
            <div className="page-header">
              <h1>My Available Slots</h1>
              <p>Add time slots patients can book</p>
            </div>
            <div className="card" style={{ maxWidth: 480 }}>
              <div className="card-header"><h3>Add New Slot</h3></div>
              <div className="card-body">
                <form onSubmit={handleAddSlot}>
                  <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>
                    <div className="form-group">
                      <label>Date</label>
                      <input required type="date" value={slotForm.date}
                        min={new Date().toISOString().split("T")[0]}
                        onChange={e => setSlotForm({ ...slotForm, date: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>Start Time</label>
                      <input required type="time" value={slotForm.startTime}
                        onChange={e => setSlotForm({ ...slotForm, startTime: e.target.value })} />
                    </div>
                    <div className="form-group">
                      <label>End Time</label>
                      <input required type="time" value={slotForm.endTime}
                        onChange={e => setSlotForm({ ...slotForm, endTime: e.target.value })} />
                    </div>
                  </div>
                  <div style={{ marginTop: 20 }}>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                      {loading ? "Adding..." : "Add Slot"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    BOOKED: "badge-booked", CONFIRMED: "badge-confirmed",
    COMPLETED: "badge-completed", CANCELLED: "badge-cancelled"
  };
  return <span className={`badge ${map[status] || ""}`}>{status}</span>;
}

export default DoctorDashboard;