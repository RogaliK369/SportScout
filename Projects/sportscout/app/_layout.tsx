import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

import { AuthProvider, useAuth } from '@/lib/auth';
import { ReservationsProvider } from '@/lib/reservations';

SplashScreen.preventAutoHideAsync();

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: 'index',
};

function AppProviders({ children }: { children: React.ReactNode }) {
  const { isLoggedIn } = useAuth();
  const [reservationResetKey, setReservationResetKey] = useState(0);

  useEffect(() => {
    if (!isLoggedIn) {
      setReservationResetKey((key) => key + 1);
    }
  }, [isLoggedIn]);

  return (
    <ReservationsProvider resetKey={reservationResetKey}>{children}</ReservationsProvider>
  );
}

/**
 * Root layout: wraps the app in auth state and defines the main navigation stack.
 */
export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <AuthProvider>
      <AppProviders>
        <Stack screenOptions={{ headerShown: false }}>
          <Stack.Screen name="index" />
          <Stack.Screen name="login" />
          <Stack.Screen name="edit-profile" />
          <Stack.Screen name="club/[id]" />
          <Stack.Screen name="(tabs)" />
        </Stack>
      </AppProviders>
    </AuthProvider>
  );
}
