// frontend/src/pages/Plan.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getSchedule } from '../services/scheduleService';
import ScheduleCard from '../components/ScheduleCard';

const Plan = () => {
  const { id } = useParams();
  const [schedule, setSchedule] = useState(null);

  useEffect(() => {
    getSchedule(id)
      .then(setSchedule)
      .catch(err => console.error(err));
  }, [id]);

  if (!schedule) return <p>Loading...</p>;

  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{schedule.planName}</h1>

      <h2 className="text-xl font-semibold mb-2">Saturday</h2>
      {schedule.saturday.map(act => <ScheduleCard key={act.activityId} activity={act} />)}

      <h2 className="text-xl font-semibold mt-4 mb-2">Sunday</h2>
      {schedule.sunday.map(act => <ScheduleCard key={act.activityId} activity={act} />)}
    </div>
  );
};

export default Plan;
