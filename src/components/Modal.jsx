import React, { useState } from "react";
import { X, Download, Share2, Save, Printer } from "lucide-react";
import { collection, addDoc, updateDoc, doc, serverTimestamp } from "firebase/firestore";
import { db, auth } from "../utils/firebase";

const ExportModal = ({
  show,
  onClose,
  weekendThemeName,
  totalActivities,
  holidayDays,
  selectedTheme,
  customStartDate,
  customDuration,
  selectedPlanId,
  moodConfig // 👈 pass moodConfig from parent
}) => {
  const [shareLink, setShareLink] = useState("");

  if (!show) return null;

  // =========================================
  // 🔹 Calculate End Date (Duration - 1)
  // =========================================
  const calculateEndDate = () => {
    if (!customStartDate || !customDuration) return null;

    const start = new Date(customStartDate);
    const end = new Date(start);
    end.setDate(start.getDate() + (customDuration - 1));
    return end.toISOString().split("T")[0];
  };

  const endDate = calculateEndDate();

  // =========================================
  // 🔹 Save or Update Plan
  // =========================================
  const saveOrUpdatePlan = async () => {
    if (!auth.currentUser) return alert("Please log in first");

    const userId = auth.currentUser.uid;

    try {
      const planData = {
        userId,
        startDate: customStartDate,
        endDate: endDate,
        totalDays: customDuration,
        theme: selectedTheme,
        days: holidayDays.map(day => ({
          dayName: day.dayName,
          date: day.date.toISOString(),
          activities: day.activities.map(activity => ({
            id: activity.id || null,
            name: activity.name || "",
             timeSlot: activity.timeSlot || "Not specified",  
            location: activity.location || "Not specified",
            description: activity.description || "",
            icon: activity.icon || null,
            category: activity.category || "",
            mood: activity.mood || null,
            extraDetails: activity.extraDetails || {}
          }))
        })),
        updatedAt: serverTimestamp()
      };

      let planId = selectedPlanId;

      if (planId) {
        // 🔹 Update existing plan
        const planRef = doc(db, "weekendPlans", userId, "plans", planId);
        await updateDoc(planRef, planData);
      } else {
        // 🔹 Create new plan
        const docRef = await addDoc(collection(db, "weekendPlans", userId, "plans"), {
          ...planData,
          createdAt: serverTimestamp()
        });
        planId = docRef.id;
      }

      const link = `${window.location.origin}/view-plan?user=${userId}&plan=${planId}`;
      setShareLink(link);

      await navigator.clipboard.writeText(link);
      alert("Plan saved & link copied to clipboard!");
    } catch (err) {
      console.error(err);
      alert("Failed to save plan");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full p-6 overflow-y-auto max-h-[90vh]">
        {/* Modal Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">
            {selectedPlanId ? "Update Weekend Plan" : "Save Weekend Plan"}
          </h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Plan Summary */}
        <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">My {weekendThemeName}</h2>
          <div className="text-purple-100">{totalActivities} activities planned</div>
          <div className="mt-3 text-sm text-purple-50">
            <strong>Start:</strong> {customStartDate || "N/A"} <br />
            <strong>End:</strong> {endDate || "N/A"}
          </div>
        </div>

        {/* Activities List */}
        <div className="space-y-4">
          {holidayDays.map((day, idx) => (
            <div key={idx} className="border rounded-lg p-4 bg-gray-50 shadow-sm">
              <h3 className="font-semibold text-lg mb-2">
                📅 {day.dayName} – {day.date.toLocaleDateString()}
              </h3>
              {day.activities.length > 0 ? (
                <ul className="space-y-2">
                  {day.activities.map((activity, i) => {
                    const MoodIcon = activity.mood
                      ? moodConfig?.[activity.mood]?.icon || "✨"
                      : "";
                    return (
                      <li
                        key={i}
                        className="flex items-center gap-2 text-gray-700"
                      >
                        {/* Activity Icon */}
                        <span className="text-xl">{activity.icon || "🎯"}</span>

                        {/* Time + Activity */}
                        <span>
                         <strong>{activity.timeSlot || "⏰"}</strong> – {activity.name}   // ✅ change here

                        </span>

                        {/* Mood Icon */}
                        {MoodIcon && (
                          <span className="ml-auto text-sm opacity-70">{MoodIcon}</span>
                        )}
                      </li>
                    );
                  })}
                </ul>
              ) : (
                <p className="text-gray-400 text-sm">No activities</p>
              )}
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="mt-6 grid grid-cols-2 sm:grid-cols-4 gap-3">
          <button
            onClick={() => window.print()}
            className="p-3 border-2 border-gray-500 text-gray-700 rounded-lg hover:bg-gray-100 flex items-center justify-center gap-2"
          >
            <Printer className="w-4 h-4" />
            Print
          </button>

          <button className="p-3 border-2 border-blue-500 text-blue-500 rounded-lg hover:bg-blue-50 flex items-center justify-center gap-2">
            <Download className="w-4 h-4" />
            Download
          </button>

          <button
            onClick={saveOrUpdatePlan}
            className="p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 flex items-center justify-center gap-2"
          >
            <Share2 className="w-4 h-4" />
            {selectedPlanId ? "Update & Share" : "Save & Share"}
          </button>

          <button
            onClick={saveOrUpdatePlan}
            className="p-3 bg-green-500 text-white rounded-lg hover:bg-green-600 flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {selectedPlanId ? "Update" : "Save"}
          </button>
        </div>

        {/* Share Link */}
        {shareLink && (
          <div className="mt-4 p-3 bg-gray-100 rounded text-sm text-center break-all">
            Shareable Link:{" "}
            <a href={shareLink} className="text-blue-600 underline">
              {shareLink}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExportModal;
