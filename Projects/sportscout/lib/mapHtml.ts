import type { Club } from '@/constants/clubs';

type MapMarker = {
  lat: number;
  lng: number;
  title: string;
};

function getMarkers(clubs: Club[]): MapMarker[] {
  return clubs.map((club) => ({
    lat: club.latitude,
    lng: club.longitude,
    title: club.name,
  }));
}

function buildMarkersScript(markers: MapMarker[]): string {
  return markers
    .map(
      (marker) => `
    new google.maps.Marker({
      position: { lat: ${marker.lat}, lng: ${marker.lng} },
      map,
      title: ${JSON.stringify(marker.title)},
    });`,
    )
    .join('\n');
}

/**
 * Google Maps JavaScript API — shows all club pins (requires API key).
 */
function buildGoogleMapsJsHtml(
  clubs: Club[],
  latitude: number,
  longitude: number,
  apiKey: string,
): string {
  const markers = getMarkers(clubs);

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      html, body, #map { height: 100%; width: 100%; margin: 0; padding: 0; background: #f5f7f6; }
    </style>
  </head>
  <body>
    <div id="map"></div>
    <script>
      function initMap() {
        const map = new google.maps.Map(document.getElementById('map'), {
          center: { lat: ${latitude}, lng: ${longitude} },
          zoom: 13,
          mapTypeControl: false,
          streetViewControl: false,
          fullscreenControl: false,
        });
        ${buildMarkersScript(markers)}
      }
      window.initMap = initMap;
    </script>
    <script async defer src="https://maps.googleapis.com/maps/api/js?key=${apiKey}&callback=initMap"></script>
  </body>
</html>`;
}

/**
 * Simple Google Maps embed — no API key, center only (no custom pins).
 */
function buildGoogleMapsEmbedHtml(latitude: number, longitude: number): string {
  const embedUrl = `https://maps.google.com/maps?q=${latitude},${longitude}&z=13&output=embed`;

  return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" />
    <style>
      html, body { height: 100%; width: 100%; margin: 0; padding: 0; background: #f5f7f6; }
      iframe { height: 100%; width: 100%; border: 0; display: block; }
    </style>
  </head>
  <body>
    <iframe
      title="Google Maps"
      src="${embedUrl}"
      loading="lazy"
      allowfullscreen
      referrerpolicy="no-referrer-when-downgrade">
    </iframe>
  </body>
</html>`;
}

/**
 * Builds HTML for an in-app Google Maps WebView.
 * Uses the JS API with club markers when an API key is set; otherwise embed fallback.
 */
export function buildMapHtml(
  clubs: Club[],
  latitude: number,
  longitude: number,
  apiKey = '',
): string {
  if (apiKey) {
    return buildGoogleMapsJsHtml(clubs, latitude, longitude, apiKey);
  }

  return buildGoogleMapsEmbedHtml(latitude, longitude);
}

export function mapUsesClubMarkers(apiKey: string): boolean {
  return apiKey.length > 0;
}
