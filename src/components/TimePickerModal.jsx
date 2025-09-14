import React from "react";

const TimePickerModal = ({
  show,
  timeInput,
  setTimeInput,
  onClose,
  onAdd,
}) => {
  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl p-6 max-w-sm w-full text-gray-800 animate-fadeIn">
        {/* Title */}
        <h3 className="text-xl font-bold mb-4 text-center text-gray-900 flex items-center justify-center gap-2">
          <span role="img" aria-label="clock">
            🕒
          </span>{" "}
          Select Activity Time
        </h3>

        {/* Time Picker */}
        <div className="mb-6">
          <label className="block text-sm mb-2 font-medium text-gray-700">
            Choose Time:
          </label>
          <input
            type="time"
            value={timeInput}
            step="1800" // 30-minute intervals
            onChange={(e) => setTimeInput(e.target.value)}
            className="
              border-2 border-gray-300 
              rounded-lg p-2 w-full 
              focus:ring-2 focus:ring-blue-400 
              focus:border-blue-400 
              transition-all
              bg-white text-gray-900
              placeholder-gray-500
              [color-scheme:light]
            "
          />
          <p className="text-xs text-gray-500 mt-1">
            Time will be in 30-minute intervals (e.g., 09:00, 09:30, 10:00).
          </p>
        </div>

        {/* Buttons */}
        <div className="flex justify-between gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-gray-300 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={onAdd}
            className="flex-1 px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition-colors"
          >
            Add Activity
          </button>
        </div>
      </div>
    </div>
  );
};

export default TimePickerModal;
