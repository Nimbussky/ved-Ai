export type GeoResult = {
  latitude: number;
  longitude: number;
  timezone: string;
};

const GEOCODE_TIMEOUT_MS = 8000;

/**
 * Resolve a city name to coordinates via Nominatim.
 * Note: browsers forbid setting `User-Agent`, so we rely on the default
 * fetch headers plus `referrer`. Returns null when not found / on error.
 */
export async function geocodeCity(cityName: string): Promise<GeoResult | null> {
  const query = cityName.trim();
  if (!query) return null;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), GEOCODE_TIMEOUT_MS);
  try {
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=1`,
      { signal: controller.signal }
    );
    if (!res.ok) return null;
    const data = await res.json();
    if (!Array.isArray(data) || data.length === 0) return null;

    const lat = parseFloat(data[0].lat);
    const lon = parseFloat(data[0].lon);
    if (!Number.isFinite(lat) || !Number.isFinite(lon)) return null;

    // Derive rough IANA timezone from longitude.
    // Etc/GMT uses inverted signs: UTC+5:30 → Etc/GMT-5 (nearest hour).
    const utcOffset = Math.round(lon / 15);
    const timezone = `Etc/GMT${utcOffset <= 0 ? '+' : '-'}${Math.abs(utcOffset)}`;
    return { latitude: lat, longitude: lon, timezone };
  } catch {
    return null;
  } finally {
    clearTimeout(timeout);
  }
}
