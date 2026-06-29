import { Linking } from 'react-native';

/**
 * Opens a club location in the Google Maps app (or browser fallback).
 */
export function openInGoogleMaps(latitude: number, longitude: number, label: string) {
  const query = encodeURIComponent(`${label}@${latitude},${longitude}`);
  const url = `https://www.google.com/maps/search/?api=1&query=${query}`;

  Linking.openURL(url);
}
