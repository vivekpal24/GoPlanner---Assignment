import React from "react";
import { Plus, Filter, Share, Printer, ChevronDown } from "lucide-react";

const CalendarHeader = ({ view, setView }) => {
  const viewOptions = ["Day", "Work week", "Week", "Month"];

  return (
    <div
      style={{
        backgroundColor: "white",
        borderBottom: "1px solid #e5e7eb",
        padding: "8px 16px",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        {/* New Event Button */}
        <button
          style={{
            backgroundColor: "#2563eb",
            color: "white",
            padding: "8px 16px",
            border: "none",
            borderRadius: "6px",
            display: "flex",
            alignItems: "center",
            gap: "8px",
            cursor: "pointer",
            fontSize: "14px",
          }}
        >
          <Plus className="w-4 h-4" /> New event{" "}
          <ChevronDown className="w-4 h-4" />
        </button>

        {/* View Options */}
        <div
          style={{
            display: "flex",
            gap: "4px",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            overflow: "hidden",
          }}
        >
          {viewOptions.map((viewOption) => (
            <button
              key={viewOption}
              onClick={() => setView(viewOption)}
              style={{
                padding: "8px 12px",
                fontSize: "14px",
                border: "none",
                cursor: "pointer",
                backgroundColor:
                  view === viewOption ? "#2563eb" : "transparent",
                color: view === viewOption ? "white" : "#374151",
                fontWeight: view === viewOption ? "600" : "400",
              }}
            >
              {viewOption}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            marginLeft: "auto",
          }}
        >
          <button style={btnStyle}>Split view</button>
          <button style={btnStyle}>
            <Filter className="w-4 h-4" /> Filter
          </button>
          <button style={btnStyle}>
            <Share className="w-4 h-4" /> Share
          </button>
          <button style={btnStyle}>
            <Printer className="w-4 h-4" /> Print
          </button>
        </div>
      </div>
    </div>
  );
};

const btnStyle = {
  display: "flex",
  alignItems: "center",
  gap: "4px",
  color: "#6b7280",
  fontSize: "14px",
  padding: "4px 8px",
  borderRadius: "4px",
  border: "none",
  background: "none",
  cursor: "pointer",
};

export default CalendarHeader;
