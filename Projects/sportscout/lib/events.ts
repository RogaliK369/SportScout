import type { EventType, Sport, SportEvent } from '@/constants';
import { MOCK_EVENTS } from '@/constants';

export type EventFilter = 'all' | EventType;
export type EventTimeFilter = 'all' | 'today' | 'tomorrow';

export type EventQuery = {
  type: EventFilter;
  sports: Sport[];
  time: EventTimeFilter;
};

function isSameCalendarDay(a: Date, b: Date): boolean {
  return (
    a.getDate() === b.getDate() &&
    a.getMonth() === b.getMonth() &&
    a.getFullYear() === b.getFullYear()
  );
}

function matchesTimeFilter(startsAt: string, time: EventTimeFilter): boolean {
  if (time === 'all') {
    return true;
  }

  const eventDate = new Date(startsAt);
  const now = new Date();

  if (time === 'today') {
    return isSameCalendarDay(eventDate, now);
  }

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  return isSameCalendarDay(eventDate, tomorrow);
}

/**
 * Returns mock events sorted by start time (soonest first).
 */
export function getUpcomingEvents({
  type = 'all',
  sports = [],
  time = 'all',
}: Partial<EventQuery> = {}): SportEvent[] {
  const now = Date.now();

  return MOCK_EVENTS.filter((event) => {
    if (new Date(event.startsAt).getTime() < now) {
      return false;
    }
    if (type !== 'all' && event.type !== type) {
      return false;
    }
    if (sports.length > 0 && !sports.includes(event.sport)) {
      return false;
    }
    if (!matchesTimeFilter(event.startsAt, time)) {
      return false;
    }
    return true;
  }).sort((a, b) => new Date(a.startsAt).getTime() - new Date(b.startsAt).getTime());
}

/**
 * Formats an ISO date for the event cards, e.g. "Today, 18:00".
 */
export function formatEventTime(isoDate: string): string {
  const date = new Date(isoDate);
  const now = new Date();

  const isToday = isSameCalendarDay(date, now);

  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);
  const isTomorrow = isSameCalendarDay(date, tomorrow);

  const time = date.toLocaleTimeString(undefined, { hour: '2-digit', minute: '2-digit' });

  if (isToday) {
    return `Today, ${time}`;
  }
  if (isTomorrow) {
    return `Tomorrow, ${time}`;
  }

  const day = date.toLocaleDateString(undefined, { weekday: 'short', day: 'numeric', month: 'short' });
  return `${day}, ${time}`;
}
