import { doc, updateDoc } from "firebase/firestore";

const updateWeekendPlan = async () => {
  if (!selectedPlanId) {
    alert("No plan selected to update!");
    return;
  }

  try {
    const user = auth.currentUser;
    if (!user) {
      alert("You must be logged in to update a plan.");
      return;
    }

    const planRef = doc(db, "weekendPlans", user.uid, "plans", selectedPlanId);

    await updateDoc(planRef, {
      days: holidayDays,
      startDate: customStartDate,
      totalDays: customDuration,
      theme: selectedTheme,
      updatedAt: new Date().toISOString(),
    });

    alert("Weekend plan updated successfully!");
  } catch (error) {
    console.error("Error updating weekend plan:", error);
    alert("Failed to update plan. Please try again.");
  }
};
