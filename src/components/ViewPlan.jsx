import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebase";
import DaySchedule from "../components/DaySchedule";
import moodConfig from "../config/moodConfig";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const ViewPlan = () => {
  const query = useQuery();
  const userId = query.get("user");
  const planId = query.get("plan");

  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlan = async () => {
      if (!userId || !planId) return;

      try {
        const docRef = doc(db, "weekendPlans", userId, "plans", planId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setPlan(docSnap.data());
        } else {
          alert("Plan not found!");
        }
      } catch (err) {
        console.error(err);
        alert("Failed to fetch plan");
      } finally {
        setLoading(false);
      }
    };

    fetchPlan();
  }, [userId, planId]);

  if (loading) return <div className="text-center mt-20">Loading plan...</div>;
  if (!plan) return <div className="text-center mt-20">No plan found.</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center">🎉 {plan.theme} Weekend Plan</h1>
        <p className="text-center text-gray-600 mb-8">
          Start Date: {new Date(plan.startDate).toLocaleDateString()}, Duration: {plan.duration} days
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {(plan.days || []).map((day, index) => (
            <DaySchedule
              key={index}
              day={day.dayName}
              date={new Date(day.date).toLocaleDateString()}
              scheduledActivities={day.activities || []} // safe access
              moodConfig={moodConfig}
              readOnly={true}
              headerGradient="from-blue-500 to-purple-500"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ViewPlan;
