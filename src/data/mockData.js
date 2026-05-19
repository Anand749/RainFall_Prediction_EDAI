// Mock data for the application - will be replaced by backend API calls

export const predictionData = {
  rainfall_mm: 127.5,
  probability: 78,
  confidence: 'high',
  date: '2026-05-19',
  forecast: 'Heavy rainfall expected in the next 48 hours',
};

export const monsoonData = {
  intensity: 'strong',
  onset_date: '2026-06-01',
  withdrawal_date: '2026-09-30',
  status: 'Active',
  progress: 72,
};

export const riskData = {
  level: 'high',
  advisory: 'Take immediate precautions. Heavy rainfall may damage crops.',
  floodRisk: true,
  waterlogging: true,
};

export const historicalData = {
  lastYear: 1150,
  twoYearsAgo: 980,
  threeYearAvg: 1045,
  fiveYearAvg: 1020,
  yearly: [
    { year: '2021', rainfall: 920 },
    { year: '2022', rainfall: 1080 },
    { year: '2023', rainfall: 980 },
    { year: '2024', rainfall: 1150 },
    { year: '2025', rainfall: 1127 },
  ],
  monthly: [
    { month: 'Jan', rainfall: 15 },
    { month: 'Feb', rainfall: 22 },
    { month: 'Mar', rainfall: 18 },
    { month: 'Apr', rainfall: 35 },
    { month: 'May', rainfall: 62 },
    { month: 'Jun', rainfall: 185 },
    { month: 'Jul', rainfall: 290 },
    { month: 'Aug', rainfall: 265 },
    { month: 'Sep', rainfall: 175 },
    { month: 'Oct', rainfall: 85 },
    { month: 'Nov', rainfall: 25 },
    { month: 'Dec', rainfall: 10 },
  ],
};

export const weatherData = {
  humidity: 82,
  temperature: 31,
  wind_speed: 18,
  cloud_cover: 75,
  pressure: 1008,
  feels_like: 36,
  visibility: 8,
  uv_index: 6,
};

export const cropRecommendations = [
  {
    id: 1,
    name: 'Rice (Paddy)',
    nameKey: 'crops.crops_list.rice',
    suitability: 'high',
    icon: '🌾',
    color: '#22c55e',
    advice: 'Excellent conditions for paddy cultivation. Ensure proper drainage.',
    irrigation: 'Maintain 5-7cm water level in fields during transplanting.',
    fertilizer: 'Apply 120kg N, 60kg P2O5, 40kg K2O per hectare.',
    harvesting: 'Monitor grain moisture; harvest at 20-22% moisture content.',
    protection: 'Watch for blast disease in humid conditions. Apply fungicide if needed.',
  },
  {
    id: 2,
    name: 'Sugarcane',
    nameKey: 'crops.crops_list.sugarcane',
    suitability: 'high',
    icon: '🎋',
    color: '#16a34a',
    advice: 'Good rainfall supports sugarcane growth. Ensure earthing up.',
    irrigation: 'Reduce irrigation during heavy rainfall periods.',
    fertilizer: 'Apply 250kg N, 100kg P2O5, 120kg K2O per hectare in splits.',
    harvesting: 'Delay harvest if waterlogging persists. Check sugar content.',
    protection: 'Treat for borers. Ensure drainage to prevent red rot.',
  },
  {
    id: 3,
    name: 'Soybean',
    nameKey: 'crops.crops_list.soybean',
    suitability: 'medium',
    icon: '🫘',
    color: '#f59e0b',
    advice: 'Moderate suitability. Watch for waterlogging in heavy rainfall.',
    irrigation: 'No additional irrigation needed during monsoon.',
    fertilizer: 'Apply 20kg N, 80kg P2O5, 20kg K2O. Use Rhizobium inoculant.',
    harvesting: 'Harvest at physiological maturity. Avoid delay to prevent shattering.',
    protection: 'Monitor for rust and pod borer. Spray as per recommendation.',
  },
  {
    id: 4,
    name: 'Cotton',
    nameKey: 'crops.crops_list.cotton',
    suitability: 'low',
    icon: '☁️',
    color: '#ef4444',
    advice: 'High rainfall may cause boll rot. Consider protective measures.',
    irrigation: 'Avoid waterlogging. Ensure proper field drainage.',
    fertilizer: 'Apply 120kg N, 60kg P2O5, 60kg K2O per hectare.',
    harvesting: 'Pick bolls immediately after opening to avoid rain damage.',
    protection: 'High risk of bollworm and boll rot. Intensive monitoring needed.',
  },
  {
    id: 5,
    name: 'Maize',
    nameKey: 'crops.crops_list.maize',
    suitability: 'medium',
    icon: '🌽',
    color: '#eab308',
    advice: 'Moderate conditions. Ensure good drainage in the field.',
    irrigation: 'Critical irrigation at tasseling and grain filling stages.',
    fertilizer: 'Apply 120kg N, 60kg P2O5, 40kg K2O per hectare.',
    harvesting: 'Harvest when moisture drops to 20-25%. Dry properly.',
    protection: 'Watch for stem borer and fall armyworm during rainy season.',
  },
  {
    id: 6,
    name: 'Pulses (Dal)',
    nameKey: 'crops.crops_list.pulses',
    suitability: 'medium',
    icon: '🥣',
    color: '#a855f7',
    advice: 'Moong and urad dal suitable for kharif season.',
    irrigation: 'Light irrigation only if dry spell exceeds 15 days.',
    fertilizer: 'Apply 20kg N, 40kg P2O5 per hectare as basal dose.',
    harvesting: 'Harvest when 80% pods turn brown. Dry on threshing floor.',
    protection: 'Monitor for yellow mosaic virus. Remove infected plants.',
  },
];

export const emergencyAlerts = [
  {
    id: 1,
    type: 'flood',
    severity: 'critical',
    title: 'Flood Warning - Heavy Rainfall Alert',
    message: 'Heavy rainfall expected in your region. Risk of flooding in low-lying areas.',
    timestamp: '2026-05-19T14:30:00',
    active: true,
  },
  {
    id: 2,
    type: 'rainfall',
    severity: 'high',
    title: 'Heavy Rainfall Warning',
    message: 'Rainfall exceeding 120mm expected in next 24 hours.',
    timestamp: '2026-05-19T12:00:00',
    active: true,
  },
];

export const helplineNumbers = [
  { name: 'NDRF Helpline', number: '011-24363260', icon: '🆘' },
  { name: 'Flood Control Room', number: '1078', icon: '🌊' },
  { name: 'Ambulance', number: '108', icon: '🚑' },
  { name: 'Police', number: '100', icon: '🚔' },
  { name: 'Fire Brigade', number: '101', icon: '🚒' },
  { name: 'Disaster Management', number: '1070', icon: '⚠️' },
  { name: 'Kisan Call Center', number: '1551', icon: '🌾' },
];

// Map risk zones (mock data for nearby areas)
export const riskZones = [
  { lat: 19.076, lng: 72.8777, radius: 5000, risk: 'high', name: 'Zone A - High Rainfall' },
  { lat: 19.15, lng: 72.95, radius: 4000, risk: 'medium', name: 'Zone B - Moderate' },
  { lat: 18.95, lng: 72.82, radius: 6000, risk: 'flood', name: 'Zone C - Flood Prone' },
  { lat: 19.22, lng: 72.85, radius: 3500, risk: 'low', name: 'Zone D - Safe Zone' },
];

// Voice assistant mock responses
export const voiceResponses = {
  'rainfall': 'Based on our analysis, expected rainfall in your area is 127.5 millimeters with 78 percent probability.',
  'risk': 'The agricultural risk level in your area is currently HIGH. Please take necessary precautions to protect your crops.',
  'cotton': 'Cotton crop is at risk due to heavy rainfall. There is a chance of boll rot. Consider protective spraying and ensure proper drainage.',
  'precautions': 'Please move livestock to higher ground, secure farming equipment, store harvested crops in waterproof locations, and stay updated with weather alerts.',
  'monsoon': 'The current monsoon intensity is STRONG. The monsoon is active and progressing well across the region.',
  'history': 'Last year rainfall was 1150mm. Two years ago it was 980mm. The 3-year average is 1045mm and 5-year average is 1020mm.',
  'crops': 'For current weather conditions, Rice and Sugarcane are highly suitable. Soybean and Maize are moderately suitable. Cotton has low suitability due to heavy rainfall.',
  'default': 'I can help you with rainfall predictions, crop recommendations, risk levels, and weather information. Please ask me a specific question.',
};
