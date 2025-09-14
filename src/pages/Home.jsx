import React, { useState, useEffect } from 'react';

import ical from "ical";

import {
  Calendar, Clock, Plus, X, Share2, Download, Sparkles, Coffee, Mountain, Film,
  Book, Music, Car, Camera, Utensils, Home, Users, Heart, Zap, Smile, MapPin,
  Search, Star, Navigation
} from 'lucide-react';

import Activities from '../components/ActivityCard';

import DaySchedule from '../components/DaySchedule';
import CustomThemeModal from '../components/CustomThemeModal';
import { handleDeleteSchedule } from "../components/handleDeleteSchedule";
import TimePickerModal from "../components/TimePickerModal";
import LongWeekendSuggestions from "../components/LongWeekendSuggestion";
import DiscoverModal from '../components/DiscoverModal';
import PlannerHeader from "../components/Header";
import PlanList from "../components/PlanList";
import ExportModal from "../components/Modal";

import mockDiscoverData from '../config/mockDiscoverData';
import activityCategories from '../config/activityCategories';
import weekendThemes from '../config/weekendThemes';
import moodConfig from '../config/moodConfig';
import { collection, query, where, getDocs } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const WeekendPlanner = () => {
 

  // ====== State ======
  const [selectedPlanId, setSelectedPlanId] = useState(null);
  const [selectedTheme, setSelectedTheme] = useState('balanced');
  const [holidayDays, setHolidayDays] = useState([]);
  const [savedSchedules, setSavedSchedules] = useState([]);
  const [longWeekends, setLongWeekends] = useState([]);
  const [draggedActivity, setDraggedActivity] = useState(null);

  const [customStartDate, setCustomStartDate] = useState('');
  const [customDuration, setCustomDuration] = useState(2);

  const [showExportModal, setShowExportModal] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [timePickerActivity, setTimePickerActivity] = useState(null);
  const [timePickerDay, setTimePickerDay] = useState(null);
  const [timeInput, setTimeInput] = useState('09:00');

  const [showDiscoverModal, setShowDiscoverModal] = useState(false);
  const [discoverType, setDiscoverType] = useState('events');
  const [discoveredItems, setDiscoveredItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showCustomModal, setShowCustomModal] = useState(false);
  const [customTheme, setCustomTheme] = useState({ name:"", description:"", color:"#a855f7", icon:"Sparkles" });
  const [weekendThemesState, setWeekendThemesState] = useState({ ...weekendThemes });

  const vibeIcons = { happy: Smile, relaxed: Heart, energetic: Zap };

  // ====== Fetch user schedules ======
  useEffect(() => auth.onAuthStateChanged(async user => {
    if (!user) return;
    try {
      const plansRef = collection(db, "weekendPlans", user.uid, "plans");
      const q = query(plansRef, where("startDate", ">=", new Date().toISOString()));
      const snapshot = await getDocs(q);
      setSavedSchedules(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    } catch (err) { console.error(err); }
  }), []);

  // ====== Fetch holidays & long weekends ======
  useEffect(() => {
    const fetchHolidays = async () => {
      try {
        const res = await fetch("https://calendar.google.com/calendar/ical/en.indian%23holiday%40group.v.calendar.google.com/public/basic.ics");
        const text = await res.text();
        const data = ical.parseICS(text);
        const holidays = Object.values(data).filter(e => e.type==="VEVENT" && e.start)
          .map(ev => ({ name: ev.summary, date: ev.start.toISOString().split("T")[0] }));

        const longOnes = holidays.map(h => {
          const d = new Date(h.date);
          let duration = 0, startDate = null;
          if (d.getDay() === 5) { duration = 3; startDate = h.date; }
          if (d.getDay() === 1) { duration = 3; startDate = new Date(d.setDate(d.getDate()-2)).toISOString().split("T")[0]; }
          if (d.getDay() === 4) { duration = 4; startDate = h.date; }
          if (d.getDay() === 2) { duration = 4; startDate = new Date(d.setDate(d.getDate()-3)).toISOString().split("T")[0]; }
          return duration>0 ? { ...h, startDate, duration } : null;
        }).filter(Boolean);
        setLongWeekends(longOnes.slice(0,5));
      } catch(err){ console.error(err); }
    };
    fetchHolidays();
  }, []);

  // ====== Discover activities ======
  useEffect(() => { if(showDiscoverModal) discoverActivities(discoverType, searchQuery); }, [showDiscoverModal, discoverType, searchQuery]);

  const discoverActivities = async (type, query='') => {
    setIsLoading(true);
    let results = mockDiscoverData[type] || [];
    if(query) results = results.filter(item => item.name.toLowerCase().includes(query.toLowerCase()) || item.description.toLowerCase().includes(query.toLowerCase()));
    await new Promise(r => setTimeout(r, 500));
    setDiscoveredItems(results);
    setIsLoading(false);
  };

  const addDiscoveredActivity = (item, dayIndex) => {
    const newActivity = {
      id: `disc_${item.id}_${Date.now()}`, name: item.name, duration:120, icon: MapPin, category:'outdoor',
      vibe:'happy', color:'bg-green-100 text-green-800', location:item.location, rating:item.rating,
      distance:item.distance, description:item.description, isDiscovered:true
    };
    setTimePickerActivity(newActivity);
    setTimePickerDay(dayIndex);
    setShowTimePicker(true);
  };

  const openInMaps = location => window.open(`https://www.google.com/maps/search/${encodeURIComponent(location)}`, '_blank');

  const selectHoliday = (startDate, totalDays) => {
    if(!startDate) return;
    const days = Array.from({length: totalDays}, (_,i) => {
      const d = new Date(startDate); d.setDate(d.getDate()+i);
      return { date:d, dayName:['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][d.getDay()], activities:[] };
    });
    setHolidayDays(days);
    setCustomStartDate(startDate);
    setCustomDuration(totalDays);
  };

  const getThemeSuggestions = theme => {
    const themeConfig = weekendThemesState[theme];
    if(!themeConfig) return [];
    return Object.values(activityCategories).flatMap(cat => 
      cat.activities.filter(a=>themeConfig.suggestedMoods.includes(a.mood)).map(a=>({...a, category: cat.icon}))
    ).slice(0,6);
  };

  // ====== Drag & Drop ======
  const handleDragStart = (e, act) => setDraggedActivity(act);
  const handleDragOver = e => e.preventDefault();
  const handleDrop = (e, dayIndex) => {
    e.preventDefault();
    if(!draggedActivity) return;
    if(holidayDays[dayIndex].activities.some(a=>a.name===draggedActivity.name)){ alert("Already scheduled!"); return; }
    setTimePickerActivity(draggedActivity);
    setTimePickerDay(dayIndex);
    setShowTimePicker(true);
  };

  const addActivityWithTime = () => {
    if(!timePickerActivity || timePickerDay===null) return;
    const newActivity = {...timePickerActivity, id:Date.now(), timeSlot:timeInput};
    setHolidayDays(prev => {
      const updated = [...prev];
      updated[timePickerDay] = {...updated[timePickerDay], activities:[...updated[timePickerDay].activities,newActivity].sort((a,b)=>a.timeSlot.localeCompare(b.timeSlot))};
      return updated;
    });
    setDraggedActivity(null); setTimePickerActivity(null); setTimePickerDay(null); setTimeInput('09:00'); setShowTimePicker(false);
  };

  const removeActivity = (dayIndex, activityId) => setHolidayDays(prev => {
    const updated = [...prev];
    updated[dayIndex] = {...updated[dayIndex], activities: updated[dayIndex].activities.filter(a=>a.id!==activityId)};
    return updated;
  });

const loadSavedSchedule = sched => {
  setCustomStartDate(sched?.startDate ? new Date(sched.startDate).toISOString().split("T")[0] : '');
  setCustomDuration(sched?.totalDays || sched?.duration || 2);

  // Add custom theme if not already in state
  if (sched?.theme && !weekendThemesState[sched.theme]) {
    const customThemeFromDB = {
      name: sched.theme,
      description: sched.themeDescription || "Custom vibe from saved plan",
      color: sched.themeColor || "#a855f7",
      icon: sched.themeIcon || "Sparkles"
    };
    setWeekendThemesState(prev => ({ ...prev, [sched.theme]: customThemeFromDB }));
  }

  setSelectedTheme(sched?.theme || "balanced");

  if (sched?.days)
    setHolidayDays(
      sched.days.map(day => ({
        dayName: day.dayName,
        date: new Date(day.date),
        activities: (day.activities || []).map(a => ({
          ...a,
          id: a.id || Date.now() + Math.random(),
          timeSlot: a.timeSlot || "09:00"
        })).sort((a, b) => a.timeSlot.localeCompare(b.timeSlot))
      }))
    );

  setSelectedPlanId(sched.id);
};




  const generatePlanSummary = () => {
    const moods={}; let totalActivities=0;
    holidayDays.forEach(d=>d.activities.forEach(a=>{ totalActivities++; moods[a.mood]=(moods[a.mood]||0)+1; }));
    const dominantMood = Object.keys(moods).reduce((a,b)=>moods[a]>moods[b]?a:b,'balanced');
    return { totalActivities, dominantMood, theme:selectedTheme };
  };

  const currentPlan = savedSchedules.find(p=>{
    if(!p?.startDate) return false;
    const start=new Date(p.startDate), end=new Date(start); end.setDate(end.getDate()+(p.totalDays||2));
    const today=new Date();
    return today>=start && today<=end;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 text-black w-full">
      <div className="container mx-auto p-6 max-w-7xl w-fit">
        <PlannerHeader />
        <PlanList savedSchedules={savedSchedules} loadSavedSchedule={loadSavedSchedule} handleDeleteSchedule={handleDeleteSchedule} selectedPlanId={selectedPlanId} setSavedSchedules={setSavedSchedules} setHolidayDays={setHolidayDays} setSelectedPlanId={setSelectedPlanId}   weekendThemesState={weekendThemesState}/>
        <LongWeekendSuggestions longWeekends={longWeekends} onSelect={selectHoliday} />

        {/* Theme Selection */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black"><Sparkles className="w-6 h-6 text-purple-500" />Choose Your Weekend Vibe</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(weekendThemesState).map(([key, theme])=>{
              const Icon=theme.icon;
              return <button key={key} onClick={()=>setSelectedTheme(key)} className={`p-4 rounded-xl transition-all duration-300 transform hover:scale-105 ${selectedTheme===key ? `bg-gradient-to-r ${theme.color} text-white shadow-lg` : "bg-white hover:shadow-md border-2 border-gray-200 text-black"}`}><Icon className="w-8 h-8 mx-auto mb-2" /><div className="font-semibold text-black">{theme.name}</div><div className="text-sm opacity-75 text-black">{theme.description}</div></button>;
            })}
            <button onClick={()=>setShowCustomModal(true)} className="p-4 rounded-xl border-2 border-dashed border-gray-300 hover:border-purple-500 hover:shadow-md transition-all duration-300 flex flex-col items-center justify-center text-gray-700 hover:text-purple-500"><span className="text-3xl mb-2">➕</span><div className="font-semibold">Custom</div><div className="text-sm opacity-70 text-center">Create your own vibe</div></button>
          </div>
        </div>

        <CustomThemeModal show={showCustomModal} onClose={()=>setShowCustomModal(false)} customTheme={customTheme} setCustomTheme={setCustomTheme} weekendThemesState={weekendThemesState} setWeekendThemesState={setWeekendThemesState} setSelectedTheme={setSelectedTheme} />

        {/* Calendar + Duration */}
        <div className="mb-8 p-4 bg-white rounded-xl shadow-md border border-gray-200 text-black">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2 text-black"><Calendar className="w-5 h-5 text-blue-500" />Select Start Date & Duration</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div><label className="block font-semibold mb-1 text-black">Start Date:</label><input type="date" value={customStartDate} onChange={e=>setCustomStartDate(e.target.value)} className="border rounded-lg p-2 w-full text-black" /></div>
            <div><label className="block font-semibold mb-1 text-black">Duration:</label><select value={customDuration} onChange={e=>setCustomDuration(parseInt(e.target.value))} className="border rounded-lg p-2 w-full text-black"><option value={2}>Weekend Only (Sat-Sun)</option><option value={3}>3-Day Long Weekend</option><option value={4}>4-Day Long Weekend</option><option value={7}>Full Week</option></select></div>
          </div>
          <button onClick={()=>selectHoliday(customStartDate, customDuration)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Generate Schedule</button>
        </div>

        {/* Activities & Schedule */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <Activities activityCategories={activityCategories} weekendThemes={weekendThemesState} selectedTheme={selectedTheme} getThemeSuggestions={getThemeSuggestions} handleDragStart={handleDragStart} moodConfig={moodConfig} />
          <div className="lg:col-span-2">
            {holidayDays.length>0 && <>
              <div className="flex items-center justify-between mb-4 text-black">
                <h2 className="text-2xl font-semibold flex items-center gap-2 text-black"><Calendar className="w-6 h-6 text-blue-500" />Holiday Schedule</h2>
<div className="flex justify-end gap-2">
  <button 
    onClick={() => setShowDiscoverModal(true)} 
    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${weekendThemes?.[selectedTheme]?.color || 'from-gray-400 to-gray-500'} text-white rounded-lg text-sm hover:shadow-lg transition-all`}
  >
    <Search className="w-4 h-4"/>Discover
  </button>

  <button 
    onClick={() => setShowExportModal(true)} 
    className={`flex items-center gap-2 px-4 py-2 bg-gradient-to-r ${weekendThemes?.[selectedTheme]?.color || 'from-gray-400 to-gray-500'} text-white rounded-lg hover:shadow-lg transition-all`}
  >
    <Share2 className="w-4 h-4"/>Export Plan
  </button>
</div>


              </div>
              {showDiscoverModal && <DiscoverModal themes={weekendThemes} selectedTheme={selectedTheme} discoverType={discoverType} setDiscoverType={setDiscoverType} searchQuery={searchQuery} setSearchQuery={setSearchQuery} isLoading={isLoading} discoveredItems={discoveredItems} setShowDiscoverModal={setShowDiscoverModal} addDiscoveredActivity={addDiscoveredActivity} openInMaps={openInMaps} holidayDays={holidayDays} />}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">{holidayDays.map((day,i)=><DaySchedule key={i} day={day.dayName} date={day.date.toLocaleDateString()} scheduledActivities={day.activities} handleDragOver={handleDragOver} handleDrop={e=>handleDrop(e,i)} handleDragStart={handleDragStart} removeActivity={aId=>removeActivity(i,aId)} moodConfig={moodConfig} headerGradient="from-blue-500 to-purple-500" />)}</div>
            </>}
          </div>
        </div>

        <ExportModal show={showExportModal} onClose={()=>setShowExportModal(false)} weekendThemeName={weekendThemesState[selectedTheme]?.name} totalActivities={generatePlanSummary().totalActivities} holidayDays={holidayDays} selectedTheme={selectedTheme} customStartDate={customStartDate} customDuration={customDuration} selectedPlanId={selectedPlanId} moodConfig={moodConfig} />
        <TimePickerModal show={showTimePicker} timeInput={timeInput} setTimeInput={setTimeInput} onClose={()=>setShowTimePicker(false)} onAdd={addActivityWithTime} />
      </div>
    </div>
  );
};

export default WeekendPlanner;
