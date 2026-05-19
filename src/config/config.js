// Application configuration
export const APP_CONFIG = {
  name: 'Smart Farmer',
  version: '1.0.0',
  description: 'Rainfall Prediction System for Indian Farmers',
};

// API endpoints (placeholders for future backend integration)
export const API_ENDPOINTS = {
  prediction: '/api/predict',
  historical: '/api/historical',
  alerts: '/api/alerts',
  weather: '/api/weather',
  crops: '/api/crops',
};

// Language configuration
export const LANGUAGES = [
  { code: 'en', name: 'English', nativeName: 'English', speechLang: 'en-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLang: 'hi-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLang: 'mr-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLang: 'bn-IN' },
  { code: 'as', name: 'Assamese', nativeName: 'অসমীয়া', speechLang: 'as-IN' },
  { code: 'bho', name: 'Bhojpuri', nativeName: 'भोजपुरी', speechLang: 'hi-IN' },
];

// Map configuration
export const MAP_CONFIG = {
  defaultCenter: [20.5937, 78.9629], // India center
  defaultZoom: 5,
  userZoom: 12,
  tileUrl: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  attribution: '© OpenStreetMap contributors',
};

// Risk level colors
export const RISK_COLORS = {
  low: '#22c55e',
  medium: '#f59e0b',
  high: '#ef4444',
  red_alert: '#dc2626',
};

// Monsoon intensity colors
export const MONSOON_COLORS = {
  weak: '#93c5fd',
  normal: '#3b82f6',
  strong: '#1d4ed8',
  extreme: '#7c3aed',
};
