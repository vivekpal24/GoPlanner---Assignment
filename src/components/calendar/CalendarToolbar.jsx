import React from "react";
import "../../styles/SchedulePage.css";
import { Plus, Filter, Share, Printer, ChevronDown } from "lucide-react";

const CalendarToolbar = ({ view, setView }) => {
  return (
    <div className="calendar-toolbar">
      <button className="new-event-btn">
        <Plus className="w-4 h-4" /> New event <ChevronDown className="w-4 h-4" />
      </button>
      <div className="view-options">
        {["Day", "Work week", "Week", "Month"].map((viewOption) => (
          <button
            key={viewOption}
            onClick={() => setView(viewOption)}
            className={`view-btn ${view === viewOption ? "active" : ""}`}
          >
            {viewOption}
          </button>
        ))}
      </div>
      <div className="toolbar-actions">
        <button>Split view</button>
        <button><Filter className="w-4 h-4" /> Filter</button>
        <button><Share className="w-4 h-4" /> Share</button>
        <button><Printer className="w-4 h-4" /> Print</button>
      </div>
    </div>
  );
};

export default CalendarToolbar;
