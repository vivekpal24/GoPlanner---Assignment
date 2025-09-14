import React, { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import EventModal from "./EventModal";

const CalendarMain = ({
  view,
  today,
  currentDate,
  visibleDates,
  navigateWeek,
  goToToday,
  timeSlots,
  currentTimePos,
  todayColumnIndex,
  events,
  setEvents,
  handleTimeSlotClick,
  showEventModal,
  setShowEventModal,
  newEvent,
  setNewEvent,
  handleAddEvent,
}) => {
  const calendarRef = useRef(null);

  // Date range formatter
  const formatDateRange = () => {
    if (view === "Month") {
      return currentDate.toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      });
    } else {
      const start = visibleDates[0];
      const end = visibleDates[visibleDates.length - 1];
      return `${start.toLocaleDateString("en-US", { month: "short", day: "numeric" })} – ${end.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}`;
    }
  };

  // Drag-end handler to move event
  const handleDragEnd = (e, eventId) => {
    e.preventDefault();
    if (!calendarRef.current) return;

    const gridRect = calendarRef.current.getBoundingClientRect();
    const pointerY = e.clientY - gridRect.top;
    const pointerX = e.clientX - gridRect.left;

    const headerHeight = 64; // header + date row
    const rowHeight = 60; // height per hour slot
    const colWidth = (gridRect.width - 80) / visibleDates.length;

    const rowIndex = Math.floor((pointerY - headerHeight) / rowHeight);
    const dayIndex = Math.floor((pointerX - 80) / colWidth);

    const draggedEvent = events.find((ev) => ev.id === eventId);
    if (!draggedEvent || rowIndex < 0 || dayIndex < 0 || dayIndex >= visibleDates.length) return;

    const startHour = rowIndex;
    const duration = parseInt(draggedEvent.endTime.split(":")[0]) - parseInt(draggedEvent.startTime.split(":")[0]);
    const endHour = startHour + duration;

    setEvents((prev) =>
      prev.map((ev) =>
        ev.id === eventId
          ? {
              ...ev,
              dayIndex,
              hour: startHour,
              startTime: `${startHour}:00`,
              endTime: `${endHour}:00`,
            }
          : ev
      )
    );
  };

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", backgroundColor: "white" }}>
      {/* Header */}
      <div style={{ borderBottom: "1px solid #e5e7eb", padding: "16px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <button onClick={goToToday} style={linkBtn}>Today</button>
          <button onClick={() => navigateWeek(-1)} style={navBtn}><ChevronLeft /></button>
          <button onClick={() => navigateWeek(1)} style={navBtn}><ChevronRight /></button>
          <h2 style={{ fontSize: "18px", fontWeight: "600" }}>{formatDateRange()}</h2>
        </div>
      </div>

      {/* Week/Day View */}
      <div
        ref={calendarRef}
        className="calendar-grid-container"
        style={{
          display: "grid",
          gridTemplateColumns: `80px repeat(${visibleDates.length}, 1fr)`,
          gap: "1px",
          backgroundColor: "#e5e7eb",
          flex: 1,
          position: "relative",
        }}
      >
        {/* Time labels */}
        <div style={{ backgroundColor: "white" }}></div>
        {visibleDates.map((date, i) => (
          <div
            key={i}
            style={{
              backgroundColor: "white",
              padding: "16px",
              textAlign: "center",
              borderBottom: "1px solid #e5e7eb",
            }}
          >
            <div style={{ fontSize: "12px", color: "#6b7280", marginBottom: "4px" }}>
              {date.toLocaleDateString("en-US", { weekday: "short" })}
            </div>
            <div
              style={{
                fontSize: "18px",
                fontWeight: "600",
                color: date.toDateString() === today.toDateString() ? "white" : "#111827",
                backgroundColor: date.toDateString() === today.toDateString() ? "#2563eb" : "transparent",
                borderRadius: date.toDateString() === today.toDateString() ? "50%" : "0",
                width: "32px",
                height: "32px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto",
              }}
            >
              {date.getDate()}
            </div>
          </div>
        ))}

        {/* Time slots grid */}
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
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
              {time.display} {time.period}
            </div>

            {visibleDates.map((date, dayIndex) => (
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
              >
                {events
                  .filter((event) => event.dayIndex === dayIndex && event.hour === time.hour)
                  .map((event) => (
                    <div
                      key={event.id}
                      draggable
                      onDragEnd={(e) => handleDragEnd(e, event.id)}
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
                        cursor: "grab",
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

      {/* Event Modal */}
      {showEventModal && (
        <EventModal
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          setShowEventModal={setShowEventModal}
          handleAddEvent={handleAddEvent}
        />
      )}
    </div>
  );
};

const linkBtn = {
  fontSize: "14px",
  color: "#2563eb",
  cursor: "pointer",
  background: "none",
  border: "none",
};
const navBtn = {
  backgroundColor: "#f3f4f6",
  border: "none",
  borderRadius: "4px",
  padding: "4px",
  cursor: "pointer",
};

export default CalendarMain;
