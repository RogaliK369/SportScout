/**
 * Local calendar date helpers (device timezone — not UTC).
 */

export function getLocalDateKey(date: Date = new Date()): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getTomorrowDateKey(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  return getLocalDateKey(tomorrow);
}

export function getDateKeyForOffset(daysFromToday: number): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromToday);
  return getLocalDateKey(date);
}

export function formatScheduleDayLabel(dateKey: string): string {
  if (isTodayDateKey(dateKey)) {
    return 'Today';
  }
  if (isTomorrowDateKey(dateKey)) {
    return 'Tomorrow';
  }
  return parseLocalDateKey(dateKey).toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

export type ScheduleDateParts = {
  weekday: string;
  dayNum: string;
  month: string;
  isToday: boolean;
  isTomorrow: boolean;
};

export function getScheduleDateParts(dateKey: string): ScheduleDateParts {
  const date = parseLocalDateKey(dateKey);
  const isToday = isTodayDateKey(dateKey);
  const isTomorrow = isTomorrowDateKey(dateKey);

  return {
    weekday: isToday ? 'Today' : isTomorrow ? 'Tmrw' : date.toLocaleDateString(undefined, { weekday: 'short' }),
    dayNum: String(date.getDate()),
    month: date.toLocaleDateString(undefined, { month: 'short' }),
    isToday,
    isTomorrow,
  };
}

export function isTodayDateKey(dateKey: string): boolean {
  return dateKey === getLocalDateKey();
}

export function isTomorrowDateKey(dateKey: string): boolean {
  return dateKey === getTomorrowDateKey();
}

/**
 * Human-readable label using the device's locale, e.g. "Today, 18:00" or "Wed 25 Jun, 10:00".
 */
export function formatSlotDateTimeLabel(dateKey: string, time: string): string {
  let dayPart: string;
  if (isTodayDateKey(dateKey)) {
    dayPart = 'Today';
  } else if (isTomorrowDateKey(dateKey)) {
    dayPart = 'Tomorrow';
  } else {
    dayPart = parseLocalDateKey(dateKey).toLocaleDateString(undefined, {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
    });
  }
  return `${dayPart}, ${time}`;
}

export function parseLocalDateKey(dateKey: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  return new Date(year, month - 1, day, 12, 0, 0, 0);
}

export function buildLocalSlotDate(dateKey: string, time: string): Date {
  const [year, month, day] = dateKey.split('-').map(Number);
  const [hours, minutes] = time.split(':').map(Number);
  return new Date(year, month - 1, day, hours, minutes, 0, 0);
}
