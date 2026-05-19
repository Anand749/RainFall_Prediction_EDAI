/**
 * API Service Layer
 * Currently returns mock data. Replace with actual API calls when backend is ready.
 */
import {
  predictionData,
  monsoonData,
  riskData,
  historicalData,
  weatherData,
  cropRecommendations,
  emergencyAlerts,
} from '../data/mockData';

// Simulate API delay
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Fetch rainfall prediction
export const fetchPrediction = async (lat, lng) => {
  await delay(800);
  // TODO: Replace with actual API call
  // const response = await fetch(`${API_ENDPOINTS.prediction}?lat=${lat}&lng=${lng}`);
  return { ...predictionData };
};

// Fetch monsoon data
export const fetchMonsoonData = async () => {
  await delay(600);
  return { ...monsoonData };
};

// Fetch agricultural risk level
export const fetchRiskLevel = async (lat, lng) => {
  await delay(700);
  return { ...riskData };
};

// Fetch historical rainfall data
export const fetchHistoricalData = async (lat, lng) => {
  await delay(900);
  return { ...historicalData };
};

// Fetch current weather
export const fetchWeatherData = async (lat, lng) => {
  await delay(500);
  return { ...weatherData };
};

// Fetch crop recommendations
export const fetchCropRecommendations = async (rainfall, risk) => {
  await delay(700);
  return [...cropRecommendations];
};

// Fetch emergency alerts
export const fetchAlerts = async (lat, lng) => {
  await delay(400);
  return [...emergencyAlerts];
};
