import Link from 'next/link';
import Button from '../ui/Button';

export default function EventCard({ event, onDelete }) {
  return (
    <div className="border rounded-lg p-6 shadow-sm hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-xl font-semibold">{event.title}</h2>
          <p className="text-gray-600 mt-1">{event.description}</p>
          <p className="text-sm text-gray-400 mt-2">
            📅 {new Date(event.date).toLocaleDateString('fr-FR')}
            &nbsp;|&nbsp; 📍 {event.location}
          </p>
        </div>
        <div className="flex gap-2">
          <Link href={`/events/${event.id}`}>
            <Button variant="outline">Voir inscrits</Button>
          </Link>
          <Button variant="danger" onClick={onDelete}>Supprimer</Button>
        </div>
      </div>
    </div>
  );
}