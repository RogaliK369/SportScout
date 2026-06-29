/**
 * Central place for route paths used with Expo Router.
 * Helps avoid typos when navigating between screens.
 */
export const Routes = {
  root: '/',
  login: '/login',
  home: '/(tabs)',
  feed: '/(tabs)/feed',
  friends: '/(tabs)/friends',
  profile: '/(tabs)/profile',
  editProfile: '/edit-profile',
  clubDetail: (id: string) => `/club/${id}` as const,
} as const;
