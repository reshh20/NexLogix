import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import AuthPage from './pages/AuthPage';
import DashboardPage from './pages/DashboardPage';

function AppRoutes() {
  const { user } = useAuth();
  // Simple state-based routing — no react-router-dom needed
  return user ? <DashboardPage /> : <AuthPage />;
}

export default function App() {
  return (
    <AuthProvider>
      <div className="min-h-screen bg-[#170D0A] text-white">
        <AppRoutes />
      </div>
    </AuthProvider>
  );
}
