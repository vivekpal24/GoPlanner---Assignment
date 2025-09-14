import React from "react";

const CalendarWeekView = ({
  today,
  weekDates,
  timeSlots,
  events,
  currentTimePos,
  todayColumnIndex,
  goToToday,
  navigateWeek,
  formatDateRange,
  handleTimeSlotClick,
}) => {
  const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return (
    <div
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        backgroundColor: "white",
      }}
    >
      {/* Header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button
            onClick={goToToday}
            style={{
              color: "#2563eb",
              fontSize: "14px",
              background: "none",
              border: "none",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            Today
          </button>
          <button
            onClick={() => navigateWeek(-1)}
            style={{
              padding: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ◀
          </button>
          <button
            onClick={() => navigateWeek(1)}
            style={{
              padding: "4px",
              background: "none",
              border: "none",
              cursor: "pointer",
            }}
          >
            ▶
          </button>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>
            {formatDateRange()}
          </h2>
        </div>
      </div>

      {/* Scrollable calendar grid */}
      <div
        style={{
          flex: 1,
          overflowX: "auto",
          overflowY: "hidden",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "80px repeat(7, 200px)", // 7 days with fixed width
            gap: "1px",
            backgroundColor: "#e5e7eb",
            minHeight: "100%",
          }}
          className="calendar-grid-container"
        >
          {/* Empty corner */}
          <div style={{ backgroundColor: "white" }}></div>

          {/* Day headers */}
          {weekDates.map((date, i) => (
            <div
              key={i}
              style={{
                backgroundColor: "white",
                padding: "16px",
                textAlign: "center",
                borderBottom: "1px solid #e5e7eb",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  marginBottom: "4px",
                }}
              >
                {weekDays[i]}
              </div>
              <div
                style={{
                  fontSize: "18px",
                  fontWeight: "600",
                  color:
                    date.toDateString() === today.toDateString()
                      ? "white"
                      : "#111827",
                  backgroundColor:
                    date.toDateString() === today.toDateString()
                      ? "#2563eb"
                      : "transparent",
                  width:
                    date.toDateString() === today.toDateString()
                      ? "32px"
                      : "auto",
                  height:
                    date.toDateString() === today.toDateString()
                      ? "32px"
                      : "auto",
                  borderRadius:
                    date.toDateString() === today.toDateString()
                      ? "50%"
                      : "0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  margin:
                    date.toDateString() === today.toDateString()
                      ? "0 auto"
                      : "0",
                }}
              >
                {date.getDate()}
              </div>
            </div>
          ))}

          {/* Time slots */}
          {timeSlots.map((time, timeIndex) => (
            <React.Fragment key={timeIndex}>
              {/* Left-side times */}
              <div
                style={{
                  backgroundColor: "white",
                  padding: "8px",
                  textAlign: "right",
                  fontSize: "12px",
                  color: "#6b7280",
                  borderRight: "1px solid #e5e7eb",
                  position: "relative",
                }}
              >
                <div
                  style={{
                    position: "absolute",
                    right: "16px",
                    top: "-8px",
                  }}
                >
                  {time.display} {time.period}
                </div>
              </div>

              {/* 7 days */}
              {weekDates.map((date, dayIndex) => (
                <div
                  key={`${timeIndex}-${dayIndex}`}
                  style={{
                    backgroundColor: "white",
                    borderBottom: "1px solid #e5e7eb",
                    borderRight: "1px solid #e5e7eb",
                    height: "60px",
                    cursor: "pointer",
                    position: "relative",
                  }}
                  onClick={() => handleTimeSlotClick(time.hour, dayIndex)}
                  onMouseEnter={(e) =>
                    (e.target.style.backgroundColor = "#f9fafb")
                  }
                  onMouseLeave={(e) =>
                    (e.target.style.backgroundColor = "white")
                  }
                >
                  {events
                    .filter(
                      (event) =>
                        event.dayIndex === dayIndex &&
                        event.hour === time.hour
                    )
                    .map((event) => (
                      <div
                        key={event.id}
                        style={{
                          position: "absolute",
                          top: "4px",
                          left: "4px",
                          right: "4px",
                          backgroundColor: "#dbeafe",
                          color: "#1e40af",
                          fontSize: "12px",
                          padding: "4px",
                          borderRadius: "4px",
                          borderLeft: "3px solid #3b82f6",
                        }}
                      >
                        {event.title}
                      </div>
                    ))}
                </div>
              ))}
            </React.Fragment>
          ))}
        </div>

        {/* Current time line */}
        {todayColumnIndex !== -1 &&
          currentTimePos &&
          currentTimePos.show && (
            <>
              <div
                style={{
                  position: "absolute",
                  top: currentTimePos.top,
                  left: `calc(80px + ${todayColumnIndex} * 200px + 1px)`,
                  width: "200px",
                  height: "2px",
                  backgroundColor: "#2563eb",
                  zIndex: 10,
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: `calc(80px + ${todayColumnIndex} * 200px - 3px)`,
                  top: `calc(${currentTimePos.top} - 3px)`,
                  width: "8px",
                  height: "8px",
                  backgroundColor: "#2563eb",
                  borderRadius: "50%",
                  zIndex: 11,
                  pointerEvents: "none",
                }}
              ></div>
            </>
          )}
      </div>
    </div>
  );
};

export default CalendarWeekView;
