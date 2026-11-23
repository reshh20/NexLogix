import React from 'react';
import NexLogixAuth from '../components/auth/NexLogixAuth';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin, register as apiRegister } from '../services/authService';

export default function AuthPage() {
  const { login } = useAuth();

  const handleAuthSuccess = async ({ email, password, fullName, phone, isSignUp, rememberMe }) => {
    try {
      let result;
      if (isSignUp) {
        result = await apiRegister(fullName, email, phone, password);
      } else {
        result = await apiLogin(email, password);
      }
      // Updating auth state automatically causes App to render DashboardPage
      login(result.user, result.token, rememberMe);
    } catch (err) {
      throw err;
    }
  };

  return <NexLogixAuth onAuthSuccess={handleAuthSuccess} />;
}
