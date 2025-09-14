import React from "react";

const EventModal = ({ newEvent, setNewEvent, setShowEventModal, handleAddEvent }) => {
  const generateTimeSlots = () => {
    const slots = [];
    for (let h = 0; h < 24; h++) {
      slots.push(`${h.toString().padStart(2, "0")}:00`);
      slots.push(`${h.toString().padStart(2, "0")}:30`);
    }
    return slots;
  };
  const timeSlots = generateTimeSlots();

  return (
    <div style={modalOverlay}>
      <div style={modalBox}>
        <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "16px" }}>Add Event</h3>
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
          style={inputStyle}
        />
        <div style={{ display: "flex", gap: "12px", marginTop: "12px" }}>
          <select
            value={newEvent.startTime}
            onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })}
            style={inputStyle}
          >
            {timeSlots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
          </select>
          <select
            value={newEvent.endTime}
            onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })}
            style={inputStyle}
          >
            {timeSlots.map((slot, i) => <option key={i} value={slot}>{slot}</option>)}
          </select>
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "16px" }}>
          <button onClick={() => setShowEventModal(false)} style={cancelBtn}>Cancel</button>
          <button onClick={handleAddEvent} style={addBtn}>Add</button>
        </div>
      </div>
    </div>
  );
};

const modalOverlay = {
  position: "fixed",
  top: 0, left: 0, right: 0, bottom: 0,
  backgroundColor: "rgba(0,0,0,0.3)",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};
const modalBox = { backgroundColor: "white", padding: "20px", borderRadius: "8px", width: "320px" };
const inputStyle = { width: "100%", padding: "8px", fontSize: "14px", border: "1px solid #d1d5db", borderRadius: "6px" };
const cancelBtn = { padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#e5e7eb", cursor: "pointer" };
const addBtn = { padding: "8px 16px", borderRadius: "6px", border: "none", backgroundColor: "#2563eb", color: "white", cursor: "pointer" };

export default EventModal;
