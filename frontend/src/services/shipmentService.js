/**
 * shipmentService.js
 * Handles all shipment-related API calls to the ASP.NET Core backend.
 */

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

function authHeaders(token) {
  return {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  };
}

/**
 * Fetch a paginated list of shipments.
 * @param {string} token - JWT auth token
 * @param {object} params - { page, pageSize, status, customerId }
 */
export async function getShipments(token, params = {}) {
  const query = new URLSearchParams(params).toString();
  const response = await fetch(`${API_BASE}/api/shipments?${query}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) throw new Error('Failed to fetch shipments.');
  return response.json();
}

/**
 * Fetch a single shipment by ID.
 * @param {string} token
 * @param {number} id
 */
export async function getShipmentById(token, id) {
  const response = await fetch(`${API_BASE}/api/shipments/${id}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) throw new Error('Shipment not found.');
  return response.json();
}

/**
 * Create a new shipment.
 * @param {string} token
 * @param {object} shipmentData
 */
export async function createShipment(token, shipmentData) {
  const response = await fetch(`${API_BASE}/api/shipments`, {
    method: 'POST',
    headers: authHeaders(token),
    body: JSON.stringify(shipmentData),
  });
  if (!response.ok) throw new Error('Failed to create shipment.');
  return response.json();
}

/**
 * Fetch delivery risk prediction from the Python ML service (via backend proxy).
 * @param {string} token
 * @param {number} shipmentId
 */
export async function getDeliveryRiskPrediction(token, shipmentId) {
  const response = await fetch(`${API_BASE}/api/predictions/${shipmentId}`, {
    headers: authHeaders(token),
  });
  if (!response.ok) throw new Error('Prediction service unavailable.');
  return response.json(); // { shipmentId, riskScore, riskLevel, factors }
}
