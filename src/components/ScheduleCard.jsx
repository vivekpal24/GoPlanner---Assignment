// frontend/src/components/ScheduleCard.jsx
import React from 'react';

const ScheduleCard = ({ activity }) => {
  return (
    <div className="bg-green-100 p-3 rounded-md shadow-sm mb-2">
      <h4 className="font-semibold">{activity.title}</h4>
      <p className="text-sm">{activity.time} - {activity.mood}</p>
    </div>
  );
};

export default ScheduleCard;
