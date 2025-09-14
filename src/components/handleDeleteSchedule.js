import { doc, deleteDoc } from "firebase/firestore";
import { auth, db } from "../utils/firebase"; // ✅ adjust path if needed

export async function handleDeleteSchedule(planId, context) {
  const {
    setSavedSchedules,
    selectedPlanId,
    setHolidayDays,
    setSelectedPlanId,
  } = context;

  if (!auth.currentUser) {
    alert("Please log in to delete your schedule.");
    return;
  }

  const confirmDelete = window.confirm(
    "Are you sure you want to delete this schedule? This action cannot be undone."
  );

  if (!confirmDelete) return;

  try {
    const userId = auth.currentUser.uid;
    const planRef = doc(db, "weekendPlans", userId, "plans", planId);

    // Delete from Firestore
    await deleteDoc(planRef);

    // Remove from local state
    if (typeof setSavedSchedules === "function") {
      setSavedSchedules((prev) => prev.filter((plan) => plan.id !== planId));
    }

    // Reset planner if deleted plan was open
    if (selectedPlanId === planId) {
      if (typeof setHolidayDays === "function") setHolidayDays([]);
      if (typeof setSelectedPlanId === "function") setSelectedPlanId(null);
    }

    alert("Schedule deleted successfully.");
  } catch (err) {
    console.error("Error deleting schedule:", err);
    alert("Failed to delete schedule. Please try again.");
  }
}
