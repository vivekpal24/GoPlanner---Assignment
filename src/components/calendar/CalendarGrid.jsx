import React from "react";
import "../../styles/SchedulePage.css";
import CalendarEvent from "./CalendarEvent";

const CalendarGrid = ({ today, workWeekDates, events, handleTimeSlotClick, timeSlots, currentTimePos }) => {
  const workDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const todayColumnIndex = workWeekDates.findIndex(date => date.toDateString() === today.toDateString());

  return (
    <div className="calendar-grid-container">
      <div className="calendar-grid">
        <div></div>
        {workWeekDates.map((date, i) => (
          <div key={i} className="day-header">
            <div>{workDays[i]}</div>
            <div className={date.toDateString() === today.toDateString() ? "today-date" : ""}>{date.getDate()}</div>
          </div>
        ))}
        {timeSlots.map((time, timeIndex) => (
          <React.Fragment key={timeIndex}>
            <div className="time-slot">{time.display} {time.period}</div>
            {workWeekDates.map((_, dayIndex) => (
              <div
                key={`${timeIndex}-${dayIndex}`}
                className="grid-cell"
                onClick={() => handleTimeSlotClick(time.hour, dayIndex)}
              >
                {events
                  .filter(event => event.dayIndex === dayIndex && event.hour === time.hour)
                  .map(event => <CalendarEvent key={event.id} event={event} />)}
              </div>
            ))}
          </React.Fragment>
        ))}
      </div>
      {todayColumnIndex !== -1 && currentTimePos?.show && (
        <>
          <div className="current-time-line" style={{ top: currentTimePos.top, left: `calc(80px + ${todayColumnIndex} * ((100% - 80px) / 5) + 1px)` }} />
          <div className="current-time-dot" style={{ top: `calc(${currentTimePos.top} - 3px)`, left: `calc(80px + ${todayColumnIndex} * ((100% - 80px) / 5) - 3px)` }} />
        </>
      )}
    </div>
  );
};

export default CalendarGrid;
