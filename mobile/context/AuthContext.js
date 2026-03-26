import React, { createContext, useState, useEffect, useContext } from "react";
import { logout, getStoredUser } from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au démarrage, on vérifie si un user est déjà connecté
  useEffect(() => {
    const loadUser = async () => {
      const storedUser = await getStoredUser();
      if (storedUser) setUser(storedUser);
      setLoading(false);
    };
    loadUser();
  }, []);

  const signIn = (userData) => {
    setUser(userData);
  };

  const signOut = async () => {
    await logout();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
