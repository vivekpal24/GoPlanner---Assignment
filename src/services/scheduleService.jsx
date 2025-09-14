// frontend/src/services/scheduleService.js

export const createSchedule = async (scheduleData) => {
  try {
    const response = await fetch('http://localhost:5000/api/schedules', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scheduleData),
    });

    if (!response.ok) throw new Error('Failed to create schedule');

    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const getSchedule = async (scheduleId) => {
  try {
    const response = await fetch(`http://localhost:5000/api/schedules/${scheduleId}`);
    if (!response.ok) throw new Error('Failed to fetch schedule');
    return await response.json();
  } catch (error) {
    console.error(error);
    return null;
  }
};
