import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';

import type { Sport } from '@/constants';

type User = {
  email: string;
  sports: Sport[];
};

type AuthContextValue = {
  user: User | null;
  isLoggedIn: boolean;
  login: (email: string, sports: Sport[]) => void;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

type AuthProviderProps = {
  children: ReactNode;
};

/**
 * Simple in-memory auth state for the app.
 * Replace with a real API call in lib/api.ts when you add a backend.
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);

  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isLoggedIn: user !== null,
      login: (email, sports) => {
        setUser({ email, sports });
      },
      logout: () => {
        setUser(null);
      },
    }),
    [user],
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
