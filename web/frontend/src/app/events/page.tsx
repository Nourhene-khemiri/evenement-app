"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import api from "@/lib/api";
import EventCard from "@/components/EventCard";
import EventForm from "@/components/EventForm";

export default function EventsPage() {
  const router = useRouter();
  const [events, setEvents] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    try {
      const res = await api.get("/events");
      setEvents(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDelete = async (id: number) => {
    if (!confirm("Supprimer cet événement ?")) return;
    try {
      await api.delete(`/events/${id}`);
      setEvents((prev) => prev.filter((e: any) => e.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    Cookies.remove("token");
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Événements</h1>
          <div className="flex gap-3">
            <button
              onClick={() => setShowForm(!showForm)}
              className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-xl text-sm font-medium transition"
            >
              {showForm ? "Annuler" : "+ Nouvel événement"}
            </button>
            <button
              onClick={handleLogout}
              className="text-red-400 hover:text-red-300 px-4 py-2 rounded-xl text-sm transition"
            >
              Déconnexion
            </button>
          </div>
        </div>

        {/* Formulaire d'ajout */}
        {showForm && (
          <div className="mb-8">
            <EventForm
              onSuccess={() => {
                setShowForm(false);
                fetchEvents();
              }}
            />
          </div>
        )}

        {/* Liste des événements */}
        {loading ? (
          <p className="text-gray-400">Chargement...</p>
        ) : events.length === 0 ? (
          <p className="text-gray-400">Aucun événement trouvé.</p>
        ) : (
          <div className="space-y-4">
            {events.map((event: any) => (
              <EventCard
                key={event.id}
                event={event}
                onDelete={handleDelete}
                onClick={() => router.push(`/events/${event.id}`)}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
