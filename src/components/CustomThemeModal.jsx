import React from "react";
import {
  Sparkles,
  Calendar,
  Share2,
  Smile,
  Music,
  Coffee,
  Sun,
  Moon,
} from "lucide-react";

const CustomThemeModal = ({
  show,
  onClose,
  customTheme,
  setCustomTheme,
  weekendThemesState,
  setWeekendThemesState,
  setSelectedTheme,
}) => {
  if (!show) return null;

  // Direct mapping with imported icons
  const iconMap = {
    Sparkles,
    Calendar,
    Share2,
    Smile,
    Music,
    Coffee,
    Sun,
    Moon,
  };

  const handleSave = () => {
    if (!customTheme.name.trim()) {
      alert("Please enter a theme name");
      return;
    }

    setWeekendThemesState({
      ...weekendThemesState,
      custom: {
        name: customTheme.name,
        description: customTheme.description,
        color: `from-[${customTheme.color}] to-[${customTheme.color}]`,
        icon: iconMap[customTheme.icon] || Sparkles,
        suggestedMoods: [],
      },
    });

    setSelectedTheme("custom");
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-transparent backdrop-blur-lg bg-opacity-40 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6">
        <h3 className="text-lg font-bold mb-4 text-center text-gray-900">
          🎨 Create Custom Theme
        </h3>

        <div className="space-y-4">
          {/* Theme Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Theme Name</label>
            <input
              type="text"
              value={customTheme.name}
              onChange={(e) =>
                setCustomTheme({ ...customTheme, name: e.target.value })
              }
              placeholder="Enter theme name"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <input
              type="text"
              value={customTheme.description}
              onChange={(e) =>
                setCustomTheme({ ...customTheme, description: e.target.value })
              }
              placeholder="Enter description"
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            />
          </div>

          {/* Theme Color */}
          <div>
            <label className="block text-sm font-medium mb-1">Theme Color</label>
            <input
              type="color"
              value={customTheme.color}
              onChange={(e) =>
                setCustomTheme({ ...customTheme, color: e.target.value })
              }
              className="w-16 h-10 p-0 border rounded cursor-pointer"
            />
          </div>

          {/* Icon Selection */}
          <div>
            <label className="block text-sm font-medium mb-1">Theme Icon</label>
            <select
              value={customTheme.icon}
              onChange={(e) =>
                setCustomTheme({ ...customTheme, icon: e.target.value })
              }
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-purple-400"
            >
              <option value="Sparkles">✨ Sparkles</option>
              <option value="Calendar">📅 Calendar</option>
              <option value="Share2">🔗 Share</option>
              <option value="Smile">😊 Smile</option>
              <option value="Music">🎵 Music</option>
              <option value="Coffee">☕ Coffee</option>
              <option value="Sun">☀️ Sun</option>
              <option value="Moon">🌙 Moon</option>
            </select>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
          >
            Save Theme
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomThemeModal;
