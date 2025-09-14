import React from "react";
import { Calendar, Clock, MapPin, X } from "lucide-react";

const DaySchedule = ({
  day,
  date,
  scheduledActivities,
  handleDragOver,
  handleDrop,
  handleDragStart,
  removeActivity,
  moodConfig,
  headerGradient,
  readOnly = false, // New prop
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg border-2 border-gray-200 min-h-96"
      onDragOver={readOnly ? undefined : handleDragOver}
      onDrop={readOnly ? undefined : handleDrop}
    >
      {/* Header */}
      <div
        className={`p-4 bg-gradient-to-r ${headerGradient} text-white rounded-t-xl`}
      >
        <h3 className="text-xl font-semibold capitalize">{day}</h3>
        <p className="text-sm opacity-90">{date}</p>
      </div>

      {/* Activities List */}
      <div className="p-4 space-y-3 min-h-80">
        {scheduledActivities.length === 0 ? (
          <div className="text-center text-gray-400 mt-12">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>{readOnly ? "No activities scheduled." : `Drag activities here to plan your ${day}`}</p>
          </div>
        ) : (
          scheduledActivities.map((activity) => (
            <div
              key={activity.id}
              draggable={readOnly ? false : true}
              onDragStart={readOnly ? undefined : (e) => handleDragStart(e, activity)}
              className={`p-3 rounded-lg border-2 border-gray-200 hover:shadow-md transition-all ${
                readOnly ? "" : "cursor-move"
              } ${moodConfig[activity.mood]?.bgColor || ""}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="font-medium text-gray-900">{activity.name}</div>
                  <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                    {activity.timeSlot && (
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {activity.timeSlot} ({activity.duration})
                      </span>
                    )}
                    {activity.location && (
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {activity.location}
                      </span>
                    )}
                  </div>
                </div>
                {!readOnly && (
                  <div className="flex items-center gap-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        moodConfig[activity.mood]?.color || ""
                      }`}
                    >
                      {moodConfig[activity.mood]?.icon}
                    </span>
                    <button
                      onClick={() => removeActivity(activity.id)}
                      className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DaySchedule;
