import React, { useState, useEffect } from "react";
import OutlookCalendarHeader from "../components/calendar/CalendarHeader";
import CalendarSidebar from "../components/calendar/CalendarSidebar";
import CalendarMain from "../components/calendar/CalendarMain";

const OutlookCalendar = () => {
  const today = new Date();
  const [currentDate, setCurrentDate] = useState(today);
  const [view, setView] = useState("Work week");
  const [events, setEvents] = useState([]);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [newEvent, setNewEvent] = useState({
    title: "",
    startTime: "",
    endTime: "",
  });

  const workDays = ["Mon", "Tue", "Wed", "Thu", "Fri"];

  // Get week dates (Sun–Sat)
  const getWeekDates = (date) => {
    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return Array.from({ length: 7 }, (_, i) => {
      const d = new Date(startOfWeek);
      d.setDate(startOfWeek.getDate() + i);
      return d;
    });
  };
  const weekDates = getWeekDates(currentDate);
  const workWeekDates = weekDates.slice(1, 6);

  // Get month dates (6 rows, 7 cols = 42 cells)
  const getMonthDates = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - startDate.getDay());
    return Array.from({ length: 42 }, (_, i) => {
      const d = new Date(startDate);
      d.setDate(startDate.getDate() + i);
      return d;
    });
  };
  const monthDates = getMonthDates(currentDate);

  // Navigation
  const navigateWeek = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + dir * 7);
    setCurrentDate(newDate);
  };
  const navigateMonth = (dir) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + dir);
    setCurrentDate(newDate);
  };
  const goToToday = () => setCurrentDate(new Date());

  // Time slots
  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const display = i === 0 ? "12" : i > 12 ? `${i - 12}` : `${i}`;
    const period = i >= 12 ? "PM" : "AM";
    return { hour: i, display, period };
  });

  // Current time position
  const getCurrentTimePosition = () => {
    const now = new Date();
    const hour = now.getHours();
    const minutes = now.getMinutes();
    const top = 80 + hour * 60 + (minutes / 60) * 60;
    return { top: `${top}px`, show: true };
  };
  const [currentTimePos, setCurrentTimePos] = useState(getCurrentTimePosition());
  useEffect(() => {
    const interval = setInterval(
      () => setCurrentTimePos(getCurrentTimePosition()),
      60000
    );
    setCurrentTimePos(getCurrentTimePosition());
    return () => clearInterval(interval);
  }, [currentDate]);

  // Scroll to current time
  useEffect(() => {
    const container = document.querySelector(".calendar-grid-container");
    if (container && currentTimePos) {
      container.scrollTop = parseFloat(currentTimePos.top) - 200;
    }
  }, [currentTimePos]);

  // Event handlers
  const handleTimeSlotClick = (hour, dayIndex) => {
    const activeDates =
      view === "Week" ? weekDates : view === "Work week" ? workWeekDates : [today];
    setSelectedSlot({ hour, dayIndex });
    setNewEvent({
      title: "",
      startTime: `${hour}:00`,
      endTime: `${hour + 1}:00`,
    });
    setShowEventModal(true);
  };

  const handleAddEvent = () => {
    if (!newEvent.title.trim()) return;
    const activeDates =
      view === "Week" ? weekDates : view === "Work week" ? workWeekDates : [today];
    const eventDate = activeDates[selectedSlot.dayIndex];
    const event = {
      id: Date.now(),
      title: newEvent.title,
      date: eventDate.toDateString(),
      startTime: newEvent.startTime,
      endTime: newEvent.endTime,
      dayIndex: selectedSlot.dayIndex,
      hour: selectedSlot.hour,
    };
    setEvents([...events, event]);
    setShowEventModal(false);
    setNewEvent({ title: "", startTime: "", endTime: "" });
  };

  // Active dates based on view
  let activeDates = [];
  if (view === "Day") activeDates = [today];
  else if (view === "Work week") activeDates = workWeekDates;
  else if (view === "Week") activeDates = weekDates;
  else if (view === "Month") activeDates = monthDates;

  const todayColumnIndex = activeDates.findIndex(
    (date) => date.toDateString() === today.toDateString()
  );

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f9fafb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <OutlookCalendarHeader view={view} setView={setView} />
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        <CalendarSidebar
          currentDate={currentDate}
          monthDates={monthDates}
          today={today}
          setCurrentDate={setCurrentDate}
          navigateMonth={navigateMonth}
        />
        <CalendarMain
          view={view}
          today={today}
          currentDate={currentDate}
          visibleDates={activeDates}
          workDays={workDays}
          navigateWeek={navigateWeek}
          goToToday={goToToday}
          timeSlots={timeSlots}
          currentTimePos={currentTimePos}
          todayColumnIndex={todayColumnIndex}
          events={events}
          handleTimeSlotClick={handleTimeSlotClick}
          showEventModal={showEventModal}
          setShowEventModal={setShowEventModal}
          newEvent={newEvent}
          setNewEvent={setNewEvent}
          handleAddEvent={handleAddEvent}
        />
      </div>
    </div>
  );
};

export default OutlookCalendar;
