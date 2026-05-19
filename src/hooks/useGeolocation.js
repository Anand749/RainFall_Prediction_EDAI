import { useState, useEffect } from 'react';

export function useGeolocation() {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    const successHandler = (position) => {
      setLocation({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
      setLoading(false);
      setError(null);
    };

    const errorHandler = (err) => {
      let message = 'Unable to retrieve location';
      if (err.code === 1) message = 'Location access denied. Please enable location services.';
      if (err.code === 2) message = 'Location unavailable. Please try again.';
      if (err.code === 3) message = 'Location request timed out. Please try again.';
      setError(message);
      setLoading(false);
      // Fallback to Mumbai coordinates
      setLocation({ lat: 19.076, lng: 72.8777, accuracy: 0 });
    };

    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 300000,
    });
  }, []);

  return { location, error, loading };
}
