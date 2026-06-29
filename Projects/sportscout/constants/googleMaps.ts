/**
 * Google Maps API key for the in-app map WebView.
 *
 * Create a `.env` file in the project root:
 *   EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_key_here
 *
 * Enable "Maps JavaScript API" in Google Cloud Console.
 * Restart Expo after adding the key (`npm start -- --clear`).
 */
export function getGoogleMapsApiKey(): string {
  return process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ?? '';
}

export const GOOGLE_MAPS_ATTRIBUTION = 'Prague · Google Maps';
