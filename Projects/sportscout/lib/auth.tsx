import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Sport } from '@/constants/sports';

export type User = {
  name: string;
  email: string;
  sports: Sport[];
  photoUri?: string | null;
};

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  login: (profile: User) => void;
  updateProfile: (profile: User) => void;
  logout: () => void;
  sentFriendRequestIds: string[];
  sendFriendRequest: (profileId: string) => void;
  hasSentFriendRequest: (profileId: string) => boolean;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Simple in-memory auth + friend-request state for the app.
 * Replace with a real API in lib/api.ts when you add a backend.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [sentFriendRequestIds, setSentFriendRequestIds] = useState<string[]>([]);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: user !== null,
      login: (profile) => {
        setUser(profile);
      },
      updateProfile: (profile) => {
        setUser(profile);
      },
      logout: () => {
        setUser(null);
        setSentFriendRequestIds([]);
      },
      sentFriendRequestIds,
      sendFriendRequest: (profileId) => {
        setSentFriendRequestIds((current) =>
          current.includes(profileId) ? current : [...current, profileId],
        );
      },
      hasSentFriendRequest: (profileId) => sentFriendRequestIds.includes(profileId),
    }),
    [user, sentFriendRequestIds],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside AuthProvider');
  }

  return context;
}
