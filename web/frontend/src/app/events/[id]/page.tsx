"use client";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";

export default function EventDetailPage() {
  const { id } = useParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [evRes, regRes] = await Promise.all([
          api.get(`/events/${id}`),
          api.get(`/events/${id}/registrations`),
        ]);
        setEvent(evRes.data);
        setRegistrations(regRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  if (loading)
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-gray-400">Chargement...</p>
      </div>
    );

  if (!event)
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <p className="text-red-400">Événement introuvable.</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <div className="max-w-2xl mx-auto">
        <button
          onClick={() => router.back()}
          className="text-indigo-400 hover:text-indigo-300 mb-6 text-sm transition"
        >
          ← Retour
        </button>

        {/* Détail de l'événement */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 mb-8">
          <h1 className="text-3xl font-bold mb-4">{event.title}</h1>
          {event.description && (
            <p className="text-gray-300 mb-4">{event.description}</p>
          )}
          <p className="text-gray-400 text-sm">
            📅{" "}
            {new Date(event.date).toLocaleDateString("fr-FR", {
              weekday: "long",
              day: "2-digit",
              month: "long",
              year: "numeric",
            })}
          </p>
          <p className="text-gray-400 text-sm mt-1">📍 {event.location}</p>
          <span className="inline-block mt-3 bg-indigo-500/20 text-indigo-300 text-xs px-3 py-1 rounded-full">
            👥 {event.capacity} places
          </span>
        </div>

        {/* Liste des inscrits */}
        <div className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6">
          <h2 className="text-xl font-semibold mb-4">
            Inscrits ({registrations.length})
          </h2>
          {registrations.length === 0 ? (
            <p className="text-gray-400 text-sm">
              Aucun inscrit pour le moment.
            </p>
          ) : (
            <ul className="space-y-3">
              {registrations.map((reg: any) => (
                <li
                  key={reg.id}
                  className="flex items-center gap-3 border-b border-[#30363d] pb-3 last:border-0"
                >
                  <div className="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-sm font-bold">
                    {reg.User?.name?.[0]?.toUpperCase() || "?"}
                  </div>
                  <div>
                    <p className="text-white text-sm font-medium">
                      {reg.User?.name}
                    </p>
                    <p className="text-gray-400 text-xs">{reg.User?.email}</p>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
