import { useState } from 'react';
import Input from '../ui/Input';
import Button from '../ui/Button';

export default function EventForm({ onSubmit, loading }) {
  const [form, setForm] = useState({
    title: '', description: '', date: '', location: '',
  });

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Input label="Titre" name="title" value={form.title} onChange={handleChange} required />
      <div className="flex flex-col gap-1">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className="border rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>
      <Input label="Date" name="date" type="datetime-local" value={form.date} onChange={handleChange} required />
      <Input label="Lieu" name="location" value={form.location} onChange={handleChange} />
      <Button type="submit" disabled={loading}>
        {loading ? 'Création...' : "Créer l'événement"}
      </Button>
    </form>
  );
}