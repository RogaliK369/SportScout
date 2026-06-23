/**
 * Central place for route paths used with Expo Router.
 * Helps avoid typos when navigating between screens.
 */
export const Routes = {
  root: '/',
  login: '/login',
  home: '/(tabs)',
  profile: '/(tabs)/profile',
} as const;
