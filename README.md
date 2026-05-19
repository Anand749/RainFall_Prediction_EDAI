# Smart Farmer Rainfall Prediction System

A modern, responsive **frontend-only** React web application that helps Indian farmers understand rainfall predictions, monsoon intensity, agricultural risk levels, and historical rainfall data — with multilingual support and voice integration.

## Features

- **Rainfall dashboard** — prediction, probability, confidence, monsoon intensity, risk levels
- **Historical charts** — line & bar charts (Recharts) with 3-year and 5-year averages
- **Interactive map** — Leaflet.js with user location, risk zone overlays, flood-prone areas
- **Emergency alerts** — animated flood warnings, helplines, safety instructions
- **Crop recommendations** — irrigation, fertilizer, harvesting, protection advice
- **Voice assistant** — speech synthesis & recognition, multilingual announcements
- **Voice commands** — navigate dashboard sections hands-free
- **6 languages** — English, Hindi, Marathi, Bengali, Assamese, Bhojpuri
- **Dark / light mode** — night-friendly dashboard
- **Static login** — `admin123` / `admin123`

## Tech Stack

- React 19 + Vite
- React Router
- i18next (translations)
- Leaflet / react-leaflet
- Recharts
- Browser Speech Synthesis & Web Speech API

## Project Structure

```
src/
├── api/           # Placeholder API services (mock data)
├── components/    # Reusable UI components
├── config/        # App & API configuration
├── contexts/      # Auth & theme providers
├── data/          # Mock JSON data
├── hooks/         # Geolocation, speech, voice commands
├── i18n/          # Translation files (6 locales)
├── pages/         # Landing, Login, Dashboard
└── styles/        # CSS variables
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm

### Install & run

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

### Build for production

```bash
npm run build
npm run preview
```

## Login (demo)

| Field    | Value     |
|----------|-----------|
| Username | admin123  |
| Password | admin123  |

## Deploy to Vercel

1. Push the project to GitHub
2. Import the repo in [Vercel](https://vercel.com)
3. Framework preset: **Vite**
4. Build command: `npm run build`
5. Output directory: `dist`

`vercel.json` is included for SPA routing.

## Future backend integration

Replace mock calls in `src/api/services.js` with real endpoints defined in `src/config/config.js`:

- `GET /api/predict?lat=&lng=`
- `GET /api/historical?lat=&lng=`
- `GET /api/alerts?lat=&lng=`
- `GET /api/weather?lat=&lng=`
- `GET /api/crops`

## Browser support

- Chrome / Edge (recommended for voice features)
- Firefox, Safari (map & UI; voice may vary)

## License

Educational project — EDAI Sem 6.
"# RainFall_Prediction_EDAI" 
