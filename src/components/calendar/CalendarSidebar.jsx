import React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CalendarSidebar = ({ currentDate, today, setCurrentDate, navigateMonth, monthDates }) => {
  return (
    <div
      style={{
        width: "256px",
        backgroundColor: "white",
        borderRight: "1px solid #e5e7eb",
        padding: "16px",
      }}
    >
      {/* Mini Calendar */}
      <div style={{ marginBottom: "24px" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "12px",
          }}
        >
          <button
            onClick={() => navigateMonth(-1)}
            style={{
              padding: "4px",
              background: "none",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <h3 style={{ fontWeight: "600", fontSize: "14px" }}>
            {currentDate.getFullYear()}{" "}
            {currentDate.toLocaleDateString("en-US", { month: "long" })}
          </h3>
          <button
            onClick={() => navigateMonth(1)}
            style={{
              padding: "4px",
              background: "none",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: "4px",
            fontSize: "12px",
          }}
        >
          {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
            <div
              key={i}
              style={{
                textAlign: "center",
                color: "#6b7280",
                padding: "4px 0",
                fontWeight: "500",
              }}
            >
              {day}
            </div>
          ))}
          {monthDates.map((date, i) => (
            <button
              key={i}
              onClick={() => setCurrentDate(date)}
              style={{
                textAlign: "center",
                padding: "4px 0",
                borderRadius: "4px",
                cursor: "pointer",
                border: "none",
                backgroundColor:
                  date.toDateString() === today.toDateString()
                    ? "#2563eb"
                    : "transparent",
                color:
                  date.toDateString() === today.toDateString()
                    ? "white"
                    : date.getMonth() !== currentDate.getMonth()
                    ? "#d1d5db"
                    : "#111827",
              }}
            >
              {date.getDate()}
            </button>
          ))}
        </div>
      </div>

      {/* Calendar List */}
      <div>
        <h4
          style={{
            fontSize: "14px",
            fontWeight: "600",
            marginBottom: "8px",
          }}
        >
          My calendars
        </h4>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "8px",
            fontSize: "14px",
          }}
        >
          <div
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#3b82f6",
              borderRadius: "50%",
            }}
          ></div>
          <span>Calendar</span>
        </div>
        <button
          style={{
            color: "#2563eb",
            fontSize: "14px",
            marginTop: "8px",
            background: "none",
            border: "none",
            cursor: "pointer",
            textDecoration: "underline",
          }}
        >
          Show all
        </button>
      </div>
    </div>
  );
};

export default CalendarSidebar;
