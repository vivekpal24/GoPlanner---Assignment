// src/components/LongWeekendSuggestions.jsx
import React from "react";
import { Sparkles } from "lucide-react";

export default function LongWeekendSuggestions({ longWeekends, onSelect }) {
  if (!longWeekends || longWeekends.length === 0) return null;

  return (
    <div className="mb-8 p-5 rounded-2xl bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 shadow-sm">
      <h2 className="text-xl font-semibold mb-4 text-green-700 flex items-center gap-2">
        <Sparkles className="w-5 h-5 text-green-500" />
        🌴 Upcoming Long Weekends
      </h2>

      <div className="space-y-3">
        {longWeekends.map((lw, i) => (
          <div
            key={i}
            className="flex items-center justify-between bg-white rounded-xl px-4 py-3 border border-green-100 shadow-sm hover:shadow-md transition"
          >
            <div>
              <div className="font-semibold text-gray-800">{lw.name}</div>
              <div className="text-sm text-gray-600">
                📅 {lw.holidayDate} &middot; {lw.duration}-day break
              </div>
            </div>
            <button
              onClick={() => onSelect(lw.startDate, lw.duration)}
              className="px-4 py-1.5 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Plan This
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
