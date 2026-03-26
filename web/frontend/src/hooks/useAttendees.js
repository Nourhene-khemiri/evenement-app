import { useState, useEffect } from 'react';
import { eventService } from '../services/eventService';

export function useAttendees(eventId) {
  const [attendees, setAttendees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    setLoading(true);
    eventService.getAttendees(eventId)
      .then(setAttendees)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [eventId]);

  return { attendees, loading, error };
}