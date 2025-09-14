import React from "react";
import "../../styles/SchedulePage.css";
const CalendarNavbar = ({ view, setView }) => {
  const views = ["Day", "Work week", "Week", "Weekend", "Holidays", "Month"];

  return (
    <div className="calendar-navbar">
      {views.map((v) => (
        <button
          key={v}
          onClick={() => setView(v)}
          className={`calendar-btn ${view === v ? "active" : ""}`}
        >
          {v}
        </button>
      ))}
    </div>
  );
};

export default CalendarNavbar;
