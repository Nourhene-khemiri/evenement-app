"use client";
import { useState } from "react";
import api from "@/lib/api";

export default function EventForm({ onSuccess }: { onSuccess: () => void }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    location: "",
    capacity: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/events", { ...form, capacity: Number(form.capacity) });
      onSuccess();
    } catch (err: any) {
      setError(err.response?.data?.message || "Erreur lors de la création");
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full bg-[#0d1117] border border-[#30363d] text-white px-4 py-3 rounded-xl focus:outline-none focus:border-indigo-500 text-sm";

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-[#161b22] border border-[#30363d] rounded-2xl p-6 space-y-4"
    >
      <h2 className="text-lg font-semibold text-white">Nouvel événement</h2>
      {error && <p className="text-red-400 text-sm">{error}</p>}
      <input
        className={inputClass}
        placeholder="Titre"
        required
        value={form.title}
        onChange={(e) => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        className={inputClass}
        placeholder="Description"
        rows={3}
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
      />
      <input
        className={inputClass}
        type="datetime-local"
        required
        value={form.date}
        onChange={(e) => setForm({ ...form, date: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Lieu"
        value={form.location}
        onChange={(e) => setForm({ ...form, location: e.target.value })}
      />
      <input
        className={inputClass}
        placeholder="Capacité"
        type="number"
        min="1"
        value={form.capacity}
        onChange={(e) => setForm({ ...form, capacity: e.target.value })}
      />
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
      >
        {loading ? "Création..." : "Créer l'événement"}
      </button>
    </form>
  );
}
