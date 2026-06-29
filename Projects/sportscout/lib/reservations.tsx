import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

export type UserReservation = {
  slotId: string;
  reservedAt: string;
};

type ReservationsContextValue = {
  userSlotIds: Set<string>;
  userReservations: UserReservation[];
  reserveSlot: (slotId: string) => void;
  cancelSlot: (slotId: string) => void;
  isReservedByUser: (slotId: string) => boolean;
  getSlotStatus: (slotId: string, initialStatus: 'available' | 'reserved') => 'available' | 'reserved' | 'mine';
};

const ReservationsContext = createContext<ReservationsContextValue | null>(null);

type ReservationsProviderProps = {
  children: ReactNode;
  resetKey?: number;
};

/**
 * In-memory court / gym slot reservations for the current session.
 */
export function ReservationsProvider({ children, resetKey = 0 }: ReservationsProviderProps) {
  const [userReservations, setUserReservations] = useState<UserReservation[]>([]);

  useEffect(() => {
    setUserReservations([]);
  }, [resetKey]);

  const userSlotIds = useMemo(
    () => new Set(userReservations.map((reservation) => reservation.slotId)),
    [userReservations],
  );

  const reserveSlot = useCallback((slotId: string) => {
    setUserReservations((current) => {
      if (current.some((item) => item.slotId === slotId)) {
        return current;
      }
      return [...current, { slotId, reservedAt: new Date().toISOString() }];
    });
  }, []);

  const cancelSlot = useCallback((slotId: string) => {
    setUserReservations((current) => current.filter((item) => item.slotId !== slotId));
  }, []);

  const isReservedByUser = useCallback(
    (slotId: string) => userSlotIds.has(slotId),
    [userSlotIds],
  );

  const getSlotStatus = useCallback(
    (slotId: string, initialStatus: 'available' | 'reserved'): 'available' | 'reserved' | 'mine' => {
      if (userSlotIds.has(slotId)) {
        return 'mine';
      }
      return initialStatus;
    },
    [userSlotIds],
  );

  const value = useMemo(
    () => ({
      userSlotIds,
      userReservations,
      reserveSlot,
      cancelSlot,
      isReservedByUser,
      getSlotStatus,
    }),
    [userSlotIds, userReservations, reserveSlot, cancelSlot, isReservedByUser, getSlotStatus],
  );

  return <ReservationsContext.Provider value={value}>{children}</ReservationsContext.Provider>;
}

export function useReservations() {
  const context = useContext(ReservationsContext);

  if (!context) {
    throw new Error('useReservations must be used inside ReservationsProvider');
  }

  return context;
}
