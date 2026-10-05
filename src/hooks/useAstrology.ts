import { useState } from 'react';

type PlanetData = {
  name: string;
  sign: string;
  degree: number;
  house: number;
  retrograde: boolean;
  nakshatra?: string;
  nakshatraPada?: number;
};

type AstrologyResponse = {
  planets: PlanetData[];
  cacheKey?: string;
  source?: string;
  timestamp?: string;
};

export function useAstrology() {
  const [data, setData] = useState<AstrologyResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const calculateChart = async (
    date: string,
    lat: number,
    lng: number,
    time = '12:00',
    timezone = 'UTC'
  ) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch('/api/astrology', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, time, latitude: lat, longitude: lng, timezone }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to calculate chart');
      }
      
      const result = await response.json();
      setData(result);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, calculateChart };
}
