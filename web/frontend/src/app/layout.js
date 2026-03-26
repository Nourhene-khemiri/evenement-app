// src/app/layout.js
'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { Toaster } from 'react-hot-toast';
import Navbar from '@/components/layout/Navbar';
import './globals.css';

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <Provider store={store}>
          <Navbar />
          <Toaster position="top-right" />
          {children}
        </Provider>
      </body>
    </html>
  );
}