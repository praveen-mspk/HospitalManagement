import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const API = "http://localhost:8080/api";

function PatientDashboard() {
  const navigate = useNavigate();
  const email = localStorage.getItem("email");

  const [activeTab, setActiveTab]           = useState("appointments");
  const [appointments, setAppointments]     = useState([]);
  const [specializations, setSpecializations] = useState([]);
  const [doctors, setDoctors]               = useState([]);
  const [slots, setSlots]                   = useState([]);
  const [alert, setAlert]                   = useState(null);
  const [loading, setLoading]               = useState(false);
  const [showModal, setShowModal]           = useState(false);

  const [bookForm, setBookForm] = useState({
    specialization: "", doctorId: "", slotId: "",
    appointmentDate: "", startTime: "", endTime: ""
  });

  useEffect(() => { fetchAppointments(); fetchSpecializations(); }, []);

  async function fetchAppointments() {
    try {
      const res = await fetch(`${API}/appointments`, { credentials: "include" });
      if (res.ok) setAppointments(await res.json());
    } catch (e) { console.error(e); }
  }

  async function fetchSpecializations() {
    try {
      const res = await fetch(`${API}/doctors/specializations`, { credentials: "include" });
      if (res.ok) setSpecializations(await res.json());
    } catch (e) { console.error(e); }
  }

  async function fetchDoctorsBySpecialization(spec) {
    try {
      const res = await fetch(`${API}/doctors?specialization=${encodeURIComponent(spec)}`, { credentials: "include" });
      if (res.ok) setDoctors(await res.json());
    } catch (e) { console.error(e); }
  }

  async function fetchSlots(doctorId) {
    try {
      const res = await fetch(`${API}/doctors/${doctorId}/slots`, { credentials: "include" });
      if (res.ok) setSlots(await res.json());
    } catch (e) { console.error(e); }
  }

  function handleSpecializationChange(e) {
    const spec = e.target.value;
    setBookForm({ ...bookForm, specialization: spec, doctorId: "", slotId: "", appointmentDate: "", startTime: "", endTime: "" });
    setDoctors([]); setSlots([]);
    if (spec) fetchDoctorsBySpecialization(spec);
  }

  function handleDoctorChange(e) {
    const doctorId = e.target.value;
    setBookForm({ ...bookForm, doctorId, slotId: "", appointmentDate: "", startTime: "", endTime: "" });
    setSlots([]);
    if (doctorId) fetchSlots(doctorId);
  }

  function handleSlotChange(e) {
    const slotId = e.target.value;
    const slot = slots.find(s => String(s.id) === slotId);
    if (slot) {
      setBookForm({
        ...bookForm, slotId,
        appointmentDate: slot.date,
        startTime: slot.startTime,
        endTime: slot.endTime
      });
    }
  }

  async function handleBookAppointment(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch(`${API}/appointments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          doctorId: Number(bookForm.doctorId),
          appointmentDate: bookForm.appointmentDate,
          startTime: bookForm.startTime,
          endTime: bookForm.endTime
        })
      });
      if (res.ok) {
        showAlert("Appointment booked successfully!", "success");
        setShowModal(false);
        setBookForm({ specialization: "", doctorId: "", slotId: "", appointmentDate: "", startTime: "", endTime: "" });
        setDoctors([]); setSlots([]);
        fetchAppointments();
      } else {
        const err = await res.json();
        showAlert(err.message || "Booking failed.", "error");
      }
    } catch (e) { showAlert("Network error.", "error"); }
    finally { setLoading(false); }
  }

  function showAlert(msg, type) {
    setAlert({ msg, type });
    setTimeout(() => setAlert(null), 3500);
  }

  function handleLogout() { localStorage.clear(); navigate("/"); }

  const booked    = appointments.filter(a => a.status === "BOOKED").length;
  const confirmed = appointments.filter(a => a.status === "CONFIRMED").length;
  const completed = appointments.filter(a => a.status === "COMPLETED").length;

  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-logo">🏥 <span>MediCore</span><br/>Patient Portal</div>
        <nav className="sidebar-nav">
          {[
            { key: "appointments", icon: "📋", label: "My Appointments" },
            { key: "book",         icon: "➕", label: "Book Appointment" },
          ].map(item => (
            <div
              key={item.key}
              className={`nav-item ${activeTab === item.key ? "active" : ""}`}
              onClick={() => { setActiveTab(item.key); if (item.key === "book") setShowModal(true); }}
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

        <div className="page-header" style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
          <div>
            <h1>My Appointments</h1>
            <p>Track your scheduled visits</p>
          </div>
          <button className="btn btn-primary" onClick={() => setShowModal(true)}>
            + Book Appointment
          </button>
        </div>

        <div className="stats-row">
          <div className="stat-card">
            <div className="stat-icon amber">⏳</div>
            <div className="stat-info"><p>Booked</p><h3>{booked}</h3></div>
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
          <div className="card-header"><h3>Appointment History</h3></div>
          <div className="card-body">
            {appointments.length === 0 ? (
              <div className="empty-state">
                <div className="empty-icon">📋</div>
                <p>No appointments yet. Book one to get started!</p>
              </div>
            ) : (
              <div className="table-wrap">
                <table>
                  <thead>
                    <tr>
                      <th>#</th><th>Doctor</th><th>Specialization</th>
                      <th>Date</th><th>Time</th><th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appointments.map((a, i) => (
                      <tr key={a.id}>
                        <td>{i + 1}</td>
                        <td><strong>{a.doctorName}</strong></td>
                        <td>{a.specialization || "—"}</td>
                        <td>{a.appointmentDate}</td>
                        <td>{a.startTime} – {a.endTime}</td>
                        <td><StatusBadge status={a.status} /></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Book Appointment Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Book an Appointment</h3>
            <form onSubmit={handleBookAppointment}>
              <div className="form-grid" style={{ gridTemplateColumns: "1fr" }}>

                {/* Step 1: Specialization */}
                <div className="form-group">
                  <label>Specialization</label>
                  <select required value={bookForm.specialization} onChange={handleSpecializationChange}>
                    <option value="">— Select Specialization —</option>
                    {specializations.map(s => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                {/* Step 2: Doctor */}
                {doctors.length > 0 && (
                  <div className="form-group">
                    <label>Doctor</label>
                    <select required value={bookForm.doctorId} onChange={handleDoctorChange}>
                      <option value="">— Select Doctor —</option>
                      {doctors.map(d => (
                        <option key={d.id} value={d.id}>Dr. {d.name}</option>
                      ))}
                    </select>
                  </div>
                )}

                {/* Step 3: Available Slot */}
                {slots.length > 0 && (
                  <div className="form-group">
                    <label>Available Slot</label>
                    <select required value={bookForm.slotId} onChange={handleSlotChange}>
                      <option value="">— Select Slot —</option>
                      {slots.map(s => (
                        <option key={s.id} value={s.id}>
                          {s.date} | {s.startTime} – {s.endTime}
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                {bookForm.doctorId && slots.length === 0 && (
                  <p style={{ color: "var(--text-muted)", fontSize: "0.88rem" }}>
                    No available slots for this doctor.
                  </p>
                )}
              </div>

              <div className="modal-actions">
                <button type="button" className="btn btn-outline"
                  onClick={() => { setShowModal(false); setDoctors([]); setSlots([]); setBookForm({ specialization: "", doctorId: "", slotId: "", appointmentDate: "", startTime: "", endTime: "" }); }}>
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary"
                  disabled={loading || !bookForm.slotId}>
                  {loading ? "Booking..." : "Confirm Booking"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
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

export default PatientDashboard;