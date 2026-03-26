interface Props {
  event: {
    id: number;
    title: string;
    date: string;
    location: string;
    capacity: number;
  };
  onDelete: (id: number) => void;
  onClick: () => void;
}

export default function EventCard({ event, onDelete, onClick }: Props) {
  return (
    <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-5 flex justify-between items-start hover:border-indigo-500/50 transition cursor-pointer group">
      <div onClick={onClick} className="flex-1">
        <h2 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition">
          {event.title}
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          📅{" "}
          {new Date(event.date).toLocaleDateString("fr-FR", {
            day: "2-digit",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-gray-400 text-sm">📍 {event.location}</p>
        <span className="inline-block mt-2 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full">
          👥 {event.capacity} places
        </span>
      </div>
      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(event.id);
        }}
        className="text-red-400 hover:text-red-300 hover:bg-red-500/10 p-2 rounded-lg transition ml-4"
      >
        🗑️
      </button>
    </div>
  );
}
