import React, { useState } from "react";
import { Plus, Star, Clock, MapPin } from "lucide-react";

const Activities = ({
  activityCategories,
  weekendThemes,
  selectedTheme,
  getThemeSuggestions,
  handleDragStart,
  moodConfig = {},
}) => {
  const [customActivities, setCustomActivities] = useState([]);
  const [newActivity, setNewActivity] = useState({
    name: "",
    emoji: "✨",
    duration: "",
    location: "",
  });
  const [showCustomForm, setShowCustomForm] = useState(false);

  const addCustomActivity = () => {
    if (!newActivity.name || !newActivity.duration || !newActivity.location)
      return;
    const id = Date.now();
    setCustomActivities((prev) => [
      ...prev,
      { id, ...newActivity, mood: "happy" },
    ]);
    setNewActivity({ name: "", emoji: "✨", duration: "", location: "" });
    setShowCustomForm(false);
  };

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2 text-black">
        <Plus className="w-6 h-6 text-green-500" />
        Activities
      </h2>

      {/* Suggested Activities */}
      <div className="mb-6 p-4 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
        <h3 className="font-semibold text-purple-800 mb-3 flex items-center gap-2">
          <Star className="w-4 h-4" />
          Suggested for {weekendThemes?.[selectedTheme]?.name || "Weekend"}
        </h3>
        <div className="space-y-2">
          {(getThemeSuggestions?.(selectedTheme) || [])
            .slice(0, 3)
            .map((activity) => {
              const mood =
                moodConfig[activity.mood] || { icon: "🙂", color: "" };
              return (
                <div
                  key={activity.id}
                  draggable
                  onDragStart={(e) => handleDragStart(e, activity)}
                  className="p-2 bg-white rounded-lg shadow-sm hover:shadow-md transition-all cursor-move flex items-center gap-2 text-sm"
                >
                  <span>{mood.icon}</span>
                  <span className="font-medium">{activity.name}</span>
                  <span className="text-gray-500 ml-auto">
                    {activity.duration}
                  </span>
                </div>
              );
            })}
        </div>
      </div>

      {/* Toggle Custom Activities */}
      <div className="mb-4">
        <button
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="flex items-center gap-2 text-sm text-gray-700 hover:text-blue-600 font-medium"
        >
          <Plus className="w-4 h-4" />
          Custom Activities
        </button>
      </div>

      {/* Custom Activity Form */}
      {showCustomForm && (
        <div className="mb-6 p-4 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl">
          <h3 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Add Custom Activity
          </h3>
          <div className="space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Name"
                value={newActivity.name}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, name: e.target.value })
                }
                className="flex-1 p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <input
                type="text"
                placeholder="Emoji"
                value={newActivity.emoji}
                onChange={(e) =>
                  setNewActivity({ ...newActivity, emoji: e.target.value })
                }
                className="w-20 p-2 rounded-lg border border-gray-300 text-center focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <input
              type="text"
              placeholder="Duration (e.g., 2h)"
              value={newActivity.duration}
              onChange={(e) =>
                setNewActivity({ ...newActivity, duration: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              type="text"
              placeholder="Location"
              value={newActivity.location}
              onChange={(e) =>
                setNewActivity({ ...newActivity, location: e.target.value })
              }
              className="w-full p-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={addCustomActivity}
              className="w-full bg-blue-500 text-white p-2 rounded-lg hover:bg-blue-600 transition-all"
            >
              Add Activity
            </button>
          </div>
        </div>
      )}

      {/* Custom Activities List */}
      {customActivities.length > 0 && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 mb-6">
          <div className="p-3 bg-gradient-to-r from-gray-300 to-gray-400 text-white rounded-t-xl">
            <div className="flex items-center gap-2 font-semibold">
              <Plus className="w-5 h-5" />
              Custom Activities
            </div>
          </div>
          <div className="p-3 space-y-2">
            {customActivities.map((activity) => (
              <div
                key={activity.id}
                draggable
                onDragStart={(e) => handleDragStart(e, activity)}
                className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-move group hover:bg-gray-50"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-gray-900">
                      {activity.name}
                    </div>
                    <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                      <Clock className="w-3 h-3" />
                      {activity.duration}
                      <MapPin className="w-3 h-3 ml-2" />
                      {activity.location}
                    </div>
                  </div>
                  <div className="px-2 py-1 rounded-full text-xs bg-yellow-100 text-yellow-800">
                    {activity.emoji}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Existing Categories */}
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {Object.entries(activityCategories || {}).map(
          ([categoryKey, category]) => {
            const IconComponent = category.icon;
            return (
              <div
                key={categoryKey}
                className="bg-white rounded-xl shadow-sm border border-gray-200"
              >
                <div
                  className={`p-3 bg-gradient-to-r ${category.color} text-white rounded-t-xl`}
                >
                  <div className="flex items-center gap-2 font-semibold">
                    <IconComponent className="w-5 h-5" />
                    {categoryKey.charAt(0).toUpperCase() +
                      categoryKey.slice(1)}
                  </div>
                </div>
                <div className="p-3 space-y-2">
                  {(category.activities || []).map((activity) => {
                    const mood =
                      moodConfig[activity.mood] || {
                        color: "bg-gray-200 text-gray-600",
                        icon: "🙂",
                      };
                    return (
                      <div
                        key={activity.id}
                        draggable
                        onDragStart={(e) => handleDragStart(e, activity)}
                        className="p-3 border border-gray-200 rounded-lg hover:shadow-md transition-all cursor-move group hover:bg-gray-50"
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="font-medium text-gray-900">
                              {activity.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center gap-2 mt-1">
                              <Clock className="w-3 h-3" />
                              {activity.duration}
                              <MapPin className="w-3 h-3 ml-2" />
                              {activity.location}
                            </div>
                          </div>
                          <div
                            className={`px-2 py-1 rounded-full text-xs ${mood.color}`}
                          >
                            {mood.icon}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default Activities;
