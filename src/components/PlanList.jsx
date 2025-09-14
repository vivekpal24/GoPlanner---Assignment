import React from "react";
import { Calendar } from "lucide-react";

const PlanList = ({
  savedSchedules,
  loadSavedSchedule,
  handleDeleteSchedule,
  selectedPlanId,
  setSavedSchedules,     // <-- add here
  setHolidayDays,
  setSelectedPlanId,
  weekendThemesState
}) => {
  if (!savedSchedules || !savedSchedules.length) return null;

  return (
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
                {plan.totalDays} days -{" "}
                {plan.startDate
                  ? new Date(plan.startDate).toLocaleDateString()
                  : "N/A"}
              </div>
              <div className="text-sm">
                {(plan.days || [])
                  .map((d) => d.dayName || "Unknown")
                  .join(", ")}
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Theme: {weekendThemesState?.[plan.theme]?.name ?? "Custom"}
              </div>
            </div>

            {/* Remove Button with Confirmation */}
            <button
              onClick={() => {
                if (
                  window.confirm(
                    "Are you sure you want to delete this plan?"
                  )
                ) {
                  handleDeleteSchedule(
                    plan.id,
                    setSavedSchedules,
                    selectedPlanId,
                    setHolidayDays,
                    setSelectedPlanId
                  );
                }
              }}
              className="ml-3 px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlanList;
