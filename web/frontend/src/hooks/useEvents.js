import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchEvents, createEvent, deleteEvent } from '../../store/eventsSlice';

export function useEvents() {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state) => state.events);

  useEffect(() => {
    dispatch(fetchEvents());
  }, [dispatch]);

  return {
    events: items,
    loading,
    error,
    addEvent: (data) => dispatch(createEvent(data)),
    removeEvent: (id) => dispatch(deleteEvent(id)),
  };
}