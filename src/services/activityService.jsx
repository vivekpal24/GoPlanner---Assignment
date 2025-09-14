// frontend/src/services/activityService.js

export const getActivities = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/activities');
    if (!response.ok) throw new Error('Failed to fetch activities');
    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
