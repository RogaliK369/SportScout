import { Redirect } from 'expo-router';

import { Routes } from '@/constants';
import { useAuth } from '@/lib/auth';

/**
 * Entry screen: sends users to Login or Home depending on auth state.
 */
export default function IndexScreen() {
  const { isLoggedIn } = useAuth();

  if (isLoggedIn) {
    return <Redirect href={Routes.home} />;
  }

  return <Redirect href={Routes.login} />;
}
