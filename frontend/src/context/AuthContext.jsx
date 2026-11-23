import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  // Rehydrate session on mount
  useEffect(() => {
    const storedToken = localStorage.getItem('nexlogix_token');
    const storedUser = localStorage.getItem('nexlogix_user');
    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = (userData, authToken, remember = true) => {
    setUser(userData);
    setToken(authToken);
    if (remember) {
      localStorage.setItem('nexlogix_token', authToken);
      localStorage.setItem('nexlogix_user', JSON.stringify(userData));
    } else {
      sessionStorage.setItem('nexlogix_token', authToken);
      sessionStorage.setItem('nexlogix_user', JSON.stringify(userData));
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('nexlogix_token');
    localStorage.removeItem('nexlogix_user');
    sessionStorage.removeItem('nexlogix_token');
    sessionStorage.removeItem('nexlogix_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within an AuthProvider');
  return context;
}
