import { useCallback, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';
import { WebView } from 'react-native-webview';

import { Colors, Theme } from '@/constants';
import { MAP_REGION, MOCK_CLUBS } from '@/constants/clubs';
import { getGoogleMapsApiKey, GOOGLE_MAPS_ATTRIBUTION } from '@/constants/googleMaps';
import { buildMapHtml, mapUsesClubMarkers } from '@/lib/mapHtml';

/**
 * Google Maps inside a WebView (works in Expo Go).
 * Must NOT be placed inside a ScrollView (breaks on Android).
 */
export function ClubMap() {
  const { height } = useWindowDimensions();
  const mapHeight = Math.max(height * 0.38, 280);
  const [mapFailed, setMapFailed] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const apiKey = getGoogleMapsApiKey();
  const showsClubPins = mapUsesClubMarkers(apiKey);

  const html = useMemo(
    () => buildMapHtml(MOCK_CLUBS, MAP_REGION.latitude, MAP_REGION.longitude, apiKey),
    [apiKey],
  );

  const handleLoadEnd = useCallback(() => {
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setMapFailed(true);
    setIsLoading(false);
  }, []);

  if (mapFailed) {
    return (
      <View style={[styles.wrapper, styles.fallback, { height: mapHeight }]}>
        <Text style={styles.fallbackTitle}>Map could not load</Text>
        <Text style={styles.fallbackText}>
          Check your internet connection, or use the club list below and open in Google Maps.
        </Text>
      </View>
    );
  }

  return (
    <View style={[styles.wrapper, { height: mapHeight }]}>
      <View style={styles.mapFrame}>
        {isLoading ? (
          <View style={styles.loading}>
            <ActivityIndicator color={Colors.primary} size="large" />
            <Text style={styles.loadingText}>Loading Google Maps…</Text>
          </View>
        ) : null}
        <WebView
          source={{ html, baseUrl: 'https://www.google.com' }}
          style={StyleSheet.absoluteFillObject}
          scrollEnabled={false}
          originWhitelist={['*']}
          javaScriptEnabled
          domStorageEnabled
          mixedContentMode="always"
          setSupportMultipleWindows={false}
          onLoadEnd={handleLoadEnd}
          onError={handleError}
          onHttpError={handleError}
          {...(Platform.OS === 'android' ? { nestedScrollEnabled: false } : {})}
        />
      </View>
      <View style={styles.attributionBar}>
        <Text style={styles.attribution}>{GOOGLE_MAPS_ATTRIBUTION}</Text>
        {!showsClubPins ? (
          <Text style={styles.attributionHint}>
            Add EXPO_PUBLIC_GOOGLE_MAPS_API_KEY to show club pins on the map
          </Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: '100%',
    borderRadius: Theme.radius.lg,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    ...Theme.card,
  },
  mapFrame: {
    flex: 1,
    minHeight: 0,
    backgroundColor: Colors.primarySoft,
  },
  loading: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primarySoft,
    zIndex: 1,
  },
  loadingText: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
  fallback: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  fallbackTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  fallbackText: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  attributionBar: {
    backgroundColor: Colors.primaryLight,
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  attribution: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primaryDark,
    textAlign: 'center',
  },
  attributionHint: {
    fontSize: 10,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
});
