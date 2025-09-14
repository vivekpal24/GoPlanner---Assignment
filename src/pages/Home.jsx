import React, { useState, useEffect } from 'react';
import "../styles/Weekendly.css";
import ical from "ical"; 
import { Calendar, Sparkles, Share2, Moon, Zap, Sun, Users, Coffee, Music, Heart } from 'lucide-react';
import Activities from '../components/ActivityCard';
import DaySchedule from '../components/DaySchedule';
import CustomThemeModal from '../components/CustomThemeModal';
import { handleDeleteSchedule } from "../components/handleDeleteSchedule";
import TimePickerModal from "../components/TimePickerModal";
import LongWeekendSuggestions from "../components/LongWeekendSuggestion";



import ExportModal from "../components/Modal";
import activityCategories from '../config/activityCategories';
import weekendThemes from '../config/weekendThemes';
import moodConfig from '../config/moodConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const WeekendPlanner = () => {
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('balanced');
  const [holidayDays, setHolidayDays] = useState([]);
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [longWeekends, setLongWeekends] = useState([]);
  const [draggedActivity, setDraggedActivity] = useState(null);
  const [showExportModal, setShowExportModal] = useState(false);

  const [customStartDate, setCustomStartDate] = useState('');
  const [customDuration, setCustomDuration] = useState(2);

  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerActivity, setTimePickerActivity] = useState(null);
  const [timeInput, setTimeInput] = useState('09:00');
  const [timePickerDay, setTimePickerDay] = useState(null);

  // Custom theme modal state
  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTheme, setCustomTheme] = useState({
    name: "",
    description: "",
    color: "#a855f7",
    icon: "Sparkles",
  });

  // State for dynamic themes
  const [weekendThemesState, setWeekendThemesState] = useState({ ...weekendThemes });

  // ==========================================================
  // 🔹 Fetch current user's weekend plans from Firestore
  // ==========================================================
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) return;

      try {
        const plansRef = collection(db, "weekendPlans", user.uid, "plans");

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const q = query(plansRef, where("startDate", ">=", today.toISOString()));

        const querySnapshot = await getDocs(q);
        const plans = [];

        querySnapshot.forEach((doc) => {
          plans.push({ id: doc.id, ...doc.data() });
        });

        setSavedSchedules(plans);
      } catch (err) {
        console.error("Error fetching weekend plans:", err);
      }
    });

    return () => unsubscribe();
  }, []);
    // ==========================================================
  // 🔹 Fetch Google Calendar Holidays and detect long weekends
  // ==========================================================
  useEffect(() => {
    const fetchGoogleHolidays = async () => {
      try {
        const res = await fetch(
          "https://calendar.google.com/calendar/ical/en.indian%23holiday%40group.v.calendar.google.com/public/basic.ics"
        );
        const text = await res.text();
        const data = ical.parseICS(text);

        const holidays = [];
        for (const key in data) {
          const ev = data[key];
          if (ev.type === "VEVENT" && ev.start) {
            holidays.push({
              name: ev.summary,
              date: ev.start.toISOString().split("T")[0],
            });
          }
        }

        const today = new Date();
        const longOnes = [];

        for (const h of holidays) {
          const date = new Date(h.date);
          if (date < today) continue;

          const day = date.getDay();
          let duration = 0;
          let startDate = null;

          if (day === 5) {         // Friday
            duration = 3;
            startDate = h.date;
          } else if (day === 1) {  // Monday
            duration = 3;
            const d = new Date(date);
            d.setDate(d.getDate() - 2);
            startDate = d.toISOString().split("T")[0];
          } else if (day === 4) {  // Thursday
            duration = 4;
            startDate = h.date;
          } else if (day === 2) {  // Tuesday
            duration = 4;
            const d = new Date(date);
            d.setDate(d.getDate() - 3);
            startDate = d.toISOString().split("T")[0];
          }

          if (duration > 0) {
            longOnes.push({
              name: h.name,
              holidayDate: h.date,
              startDate,
              duration
            });
          }
        }

        setLongWeekends(longOnes.slice(0, 5));
      } catch (err) {
        console.error("Error fetching holidays:", err);
      }
    };

    fetchGoogleHolidays();
  }, []);


  // ==========================================================
  // 🔹 Load a selected schedule into the planner
  // ==========================================================
const loadSavedSchedule = (sched) => {
  // ✅ normalize startDate into YYYY-MM-DD
  setCustomStartDate(
    sched?.startDate
      ? new Date(sched.startDate).toISOString().split("T")[0]
      : ""
  );

  // ✅ set duration
  setCustomDuration(sched?.totalDays || sched?.duration || 2);

  // ✅ set theme
  setSelectedTheme(sched?.theme || "balanced");

  // ✅ load holidays (if saved separately)
  if (sched?.holidays) {
    setHolidayDays(new Set(sched.holidays));
  }

  // ✅ load schedule days with times restored
  setHolidayDays(
    (sched?.days || []).map((day) => ({
      dayName: day.dayName,
      date: new Date(day.date),
      activities: (day.activities || [])
        .map((a) => ({
          ...a,
          id: a.id || Date.now() + Math.random(),
          timeSlot: a.timeSlot || "09:00", // 👈 restore or default
        }))
        .sort((a, b) => a.timeSlot.localeCompare(b.timeSlot)), // 👈 sort by time
    }))
  );

  // ✅ save opened plan ID
  setSelectedPlanId(sched.id);
};



  // ==========================================================
  // 🔹 Generate new blank schedule
  // ==========================================================
  const selectHoliday = (startDate, totalDays) => {
    if (!startDate) return;
    const days = [];
    let current = new Date(startDate);
    const dayNames = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];

    for (let i = 0; i < totalDays; i++) {
      days.push({
        date: new Date(current),
        dayName: dayNames[current.getDay()],
        activities: []
      });
      current.setDate(current.getDate() + 1);
    }

    setHolidayDays(days);
    setCustomStartDate(startDate);
    setCustomDuration(totalDays);
  };

  // ==========================================================
  // 🔹 Get theme-based activity suggestions
  // ==========================================================
  const getThemeSuggestions = (theme) => {
    const themeConfig = weekendThemesState[theme];
    if (!themeConfig) return [];
    const suggestions = [];
    Object.values(activityCategories).forEach(category => {
      category.activities.forEach(activity => {
        if (themeConfig.suggestedMoods.includes(activity.mood)) {
          suggestions.push({ ...activity, category: category.icon });
        }
      });
    });
    return suggestions.slice(0, 6);
  };

  // ==========================================================
  // 🔹 Drag & Drop for activities
  // ==========================================================
  const handleDragStart = (e, activity) => setDraggedActivity(activity);
  const handleDragOver = (e) => e.preventDefault();

  const handleDrop = (e, dayIndex) => {
    e.preventDefault();
    if (!draggedActivity) return;
    const exists = holidayDays[dayIndex].activities.some(act => act.name === draggedActivity.name);
    if (exists) {
      alert("Activity already scheduled for this day!");
      return;
    }
    setTimePickerActivity(draggedActivity);
    setTimePickerDay(dayIndex);
    setShowTimePicker(true);
  };

  const addActivityWithTime = () => {
    if (!timePickerActivity || !timeInput || timePickerDay === null) return;
    const newActivity = { ...timePickerActivity, id: Date.now(), timeSlot: timeInput };
    setHolidayDays(prev => {
      const updated = [...prev];
      updated[timePickerDay] = {
        ...updated[timePickerDay],
        activities: [...updated[timePickerDay].activities, newActivity].sort((a,b) => a.timeSlot.localeCompare(b.timeSlot))
      };
      return updated;
    });
    setDraggedActivity(null);
    setTimePickerActivity(null);
    setTimePickerDay(null);
    setTimeInput('09:00');
    setShowTimePicker(false);
  };

  const removeActivity = (dayIndex, activityId) => {
    setHolidayDays(prev => {
      const updated = [...prev];
      updated[dayIndex] = {
        ...updated[dayIndex],
        activities: updated[dayIndex].activities.filter(act => act.id !== activityId)
      };
      return updated;
    });
  };

  // ==========================================================
  // 🔹 Plan summary
  // ==========================================================
  const generatePlanSummary = () => {
    let totalActivities = 0;
    const moods = {};
    holidayDays.forEach(day => {
      day.activities.forEach(activity => {
        totalActivities++;
        moods[activity.mood] = (moods[activity.mood] || 0) + 1;
      });
    });
    const dominantMood = Object.keys(moods).reduce((a,b)=>moods[a]>moods[b]?a:b,'balanced');
    return { totalActivities, dominantMood, theme: selectedTheme };
  };

  // ==========================================================
  // 🔹 Filter only current weekend plan
  // ==========================================================
  const currentPlan = savedSchedules.find(plan => {
    if (!plan?.startDate) return false;
    const planStart = new Date(plan.startDate);
    const planEnd = new Date(planStart);
    planEnd.setDate(planStart.getDate() + (plan.totalDays || 2));
    const today = new Date();
    return today >= planStart && today <= planEnd;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-black w-full">
      <div className="container mx-auto p-6 max-w-7xl  w-fit">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
            ✨ Weekend Planner
          </h1>
          <p className="text-black text-lg">Design your perfect weekend with smart suggestions and beautiful planning</p>
        </div>

        {/* Show Current Weekend */}
       {/* Show All Weekend Plans */}
{savedSchedules.length > 0 && (
  <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100">
    <h2 className="text-lg font-semibold mb-3 flex items-center gap-2 text-amber-700">
      <Calendar className="w-5 h-5" />
      All Weekend Plans
    </h2>

    <div className="space-y-3">
  {savedSchedules.map((plan) => (
    <div
      key={plan.id}
      className="flex items-center justify-between px-4 py-3 rounded-lg border bg-white border-amber-200 text-amber-800 hover:bg-amber-50 transition"
    >
      {/* Plan Info */}
      <div
        onClick={() => loadSavedSchedule(plan)}
        className="cursor-pointer flex-1"
      >
        <div className="font-semibold">
          {plan.totalDays} days - {new Date(plan.startDate).toLocaleDateString()}
        </div>
        <div className="text-sm">
          {(plan.days || []).map((d) => d.dayName).join(", ")}
        </div>
        <div className="text-xs text-gray-500 mt-1">
          Theme: {weekendThemesState[plan.theme]?.name || "Custom"}
        </div>
      </div>

      {/* Delete Button */}
     <button
  onClick={() =>
    handleDeleteSchedule(
      plan.id,
      setSavedSchedules,
      selectedPlanId,
      setHolidayDays,
      setSelectedPlanId
    )
  }
  className="ml-3 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
>
  Remove
</button>

    </div>
  ))}
</div>

  </div>
)}
{/* Long Weekend Suggestions */}

<LongWeekendSuggestions
  longWeekends={longWeekends}
  onSelect={selectHoliday}
/>



        {/* Theme Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
            <Sparkles className="w-6 h-6 text-purple-500" />
            Choose Your Weekend Vibe
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(weekendThemesState).map(([key, theme]) => {
              const IconComponent = theme.icon;
              return (
                <button
                  key={key}
                  onClick={() => setSelectedTheme(key)}
                  className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                    selectedTheme === key
                      ? `bg-gradient-to-r ${theme.color} text-white shadow-lg`
                      : "bg-white hover:shadow-md border-2 border-gray-200 text-black"
                  }`}
                >
                  <IconComponent className="w-8 h-8 mx-auto mb-2" />
                  <div className="font-semibold text-black">{theme.name}</div>
                  <div className="text-sm opacity-75 text-black">{theme.description}</div>
                </button>
              );
            })}

            {/* Custom Theme Option */}
            <button
              onClick={() => setShowCustomModal(true)}
              className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-gray-700 hover:text-purple-500"
            >
              <span className="text-3xl mb-2">➕</span>
              <div className="font-semibold">Custom</div>
              <div className="text-sm opacity-70 text-center">Create your own vibe</div>
            </button>
          </div>
        </div>

        {/* Custom Theme Modal */}
        <CustomThemeModal
          show={showCustomModal}
          onClose={() => setShowCustomModal(false)}
          customTheme={customTheme}
          setCustomTheme={setCustomTheme}
          weekendThemesState={weekendThemesState}
          setWeekendThemesState={setWeekendThemesState}
          setSelectedTheme={setSelectedTheme}
        />

        {/* Calendar + Duration */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200 text-black">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black">
            <Calendar className="w-5 h-5 text-blue-500" />
            Select Start Date & Duration
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1 text-black">Start Date:</label>
              <input
                type="date"
                value={customStartDate}
                onChange={(e) => setCustomStartDate(e.target.value)}
                className="border rounded-lg p-2 w-full text-black"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1 text-black">Duration:</label>
              <select
                value={customDuration}
                onChange={(e) => setCustomDuration(parseInt(e.target.value))}
                className="border rounded-lg p-2 w-full text-black"
              >
                <option value={2}>Weekend Only (Sat-Sun)</option>
                <option value={3}>3-Day Long Weekend</option>
                <option value={4}>4-Day Long Weekend</option>
                <option value={7}>Full Week</option>
              </select>
            </div>
          </div>
          <button
            onClick={() => selectHoliday(customStartDate, customDuration)}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
          >
            Generate Schedule
          </button>
        </div>

        {/* Activities and Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1 text-black">
            <Activities
              activityCategories={activityCategories}
              weekendThemes={weekendThemesState}
              selectedTheme={selectedTheme}
              getThemeSuggestions={getThemeSuggestions}
              handleDragStart={handleDragStart}
              moodConfig={moodConfig}
            />
          </div>

          <div className="lg:col-span-2">
            {holidayDays.length > 0 && (
              <>
                <div className="flex items-center justify-between mb-4 text-black">
                  <h2 className="text-2xl font-semibold flex items-center gap-2 text-black">
                    <Calendar className="w-6 h-6 text-blue-500" />
                    Holiday Schedule
                  </h2>
                  <button
                    onClick={() => setShowExportModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-green-500 to-teal-500 text-white rounded-lg hover:from-green-600 hover:to-teal-600 transition-all flex items-center gap-2"
                  >
                    <Share2 className="w-4 h-4" />
                    Export Plan
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {holidayDays.map((day, index) => (
                    <DaySchedule
                      key={index}
                      day={day.dayName}
                      date={day.date.toLocaleDateString()}
                      scheduledActivities={day.activities}
                      handleDragOver={handleDragOver}
                      handleDrop={(e) => handleDrop(e, index)}
                      handleDragStart={handleDragStart}
                      removeActivity={(activityId) => removeActivity(index, activityId)}
                      moodConfig={moodConfig}
                      headerGradient="from-blue-500 to-purple-500"
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* Export Modal */}
      <ExportModal
  show={showExportModal}
  onClose={() => setShowExportModal(false)}
  weekendThemeName={weekendThemesState[selectedTheme]?.name}
  totalActivities={generatePlanSummary().totalActivities}
  holidayDays={holidayDays}
  selectedTheme={selectedTheme}
  customStartDate={customStartDate}
  customDuration={customDuration}
  selectedPlanId={selectedPlanId}
  moodConfig={moodConfig}   // 👈 add this
/>



        {/* Time Picker Modal */}
       <TimePickerModal
  show={showTimePicker}
  timeInput={timeInput}
  setTimeInput={setTimeInput}
  onClose={() => setShowTimePicker(false)}
  onAdd={addActivityWithTime}
/>

      </div>
    </div>
  );
};

export default WeekendPlanner;
