/**
 * authService.js
 * Handles all authentication API calls to the ASP.NET Core backend.
 * Base URL is set via the VITE_API_BASE_URL environment variable.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

/**
 * Log in an existing user.
 * @param {string} email
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function login(email, password) {
  const response = await fetch(`${API_BASE}/api/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Login failed. Please check your credentials.');
  }

  return response.json(); // { token, user: { id, email, fullName, role } }
}

/**
 * Register a new user account.
 * @param {string} fullName
 * @param {string} email
 * @param {string} phone
 * @param {string} password
 * @returns {Promise<{ token: string, user: object }>}
 */
export async function register(fullName, email, phone, password) {
  const response = await fetch(`${API_BASE}/api/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ fullName, email, phone, password }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Registration failed. Please try again.');
  }

  return response.json(); // { token, user: { id, email, fullName, role } }
}

/**
 * Request a password reset email.
 * @param {string} email
 * @returns {Promise<void>}
 */
export async function requestPasswordReset(email) {
  const response = await fetch(`${API_BASE}/api/auth/forgot-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.message || 'Failed to send reset email.');
  }
}
