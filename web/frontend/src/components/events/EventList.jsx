import EventCard from './EventCard';

export default function EventList({ events, onDelete }) {
  if (events.length === 0) {
    return <p className="text-gray-500 text-center py-12">Aucun événement pour le moment.</p>;
  }

  return (
    <div className="grid gap-4">
      {events.map(event => (
        <EventCard
          key={event.id}
          event={event}
          onDelete={() => onDelete(event.id)}
        />
      ))}
    </div>
  );
}