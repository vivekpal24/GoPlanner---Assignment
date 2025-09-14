import React from "react";
import "../../styles/SchedulePage.css";
const EventModal = ({ newEvent, setNewEvent, handleAddEvent, setShowEventModal }) => {
  return (
    <div className="event-modal-backdrop">
      <div className="event-modal">
        <h3>Add Event</h3>
        <input
          type="text"
          placeholder="Event title"
          value={newEvent.title}
          onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
        />
        <div className="time-inputs">
          <input type="time" value={newEvent.startTime} onChange={(e) => setNewEvent({ ...newEvent, startTime: e.target.value })} />
          <input type="time" value={newEvent.endTime} onChange={(e) => setNewEvent({ ...newEvent, endTime: e.target.value })} />
        </div>
        <div className="modal-actions">
          <button onClick={() => setShowEventModal(false)}>Cancel</button>
          <button onClick={handleAddEvent}>Save</button>
        </div>
      </div>
    </div>
  );
};

export default EventModal;
