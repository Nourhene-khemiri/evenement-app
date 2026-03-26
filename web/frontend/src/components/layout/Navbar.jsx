// components/layout/Navbar.jsx
'use client';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-white border-b px-8 py-4 flex justify-between items-center">
      <Link href="/" className="text-xl font-bold">🎫 EventManager</Link>
      <div className="flex items-center gap-4">
        <Link href="/login" className="text-gray-600 hover:underline">Connexion</Link>
        <Link href="/register" className="bg-blue-600 text-white px-4 py-2 rounded-lg">
          Inscription
        </Link>
      </div>
    </nav>
  );
}