import {
  formatScheduleDayLabel,
  getDateKeyForOffset,
  parseLocalDateKey,
} from './dates';
import { SCHEDULE_DAYS_AHEAD, type ScheduleDay, type ScheduleRow } from './schedule';

function buildRows(
  clubId: string,
  dateKey: string,
  resources: string[],
  times: string[],
  reservedKeys: string[],
): ScheduleRow[] {
  return times.map((time) => ({
    time,
    cells: resources.map((_resource, index) => {
      const slotId = `${clubId}:${dateKey}:${time}:${index}`;
      const status = reservedKeys.includes(slotId) ? ('reserved' as const) : ('available' as const);
      return { slotId, status };
    }),
  }));
}

function generateReservedKeys(
  clubId: string,
  dateKey: string,
  resources: string[],
  times: string[],
  dayOffset: number,
): string[] {
  const keys: string[] = [];

  times.forEach((time, timeIndex) => {
    resources.forEach((_resource, resourceIndex) => {
      const pattern = (timeIndex * 3 + resourceIndex * 5 + dayOffset * 7 + clubId.length) % 11;
      if (pattern === 0 || pattern === 4 || pattern === 8) {
        keys.push(`${clubId}:${dateKey}:${time}:${resourceIndex}`);
      }
    });
  });

  return keys;
}

/** Builds 14 days of availability starting from today. */
export function buildMultiDaySchedule(
  clubId: string,
  resources: string[],
  times: string[],
  daysCount: number = SCHEDULE_DAYS_AHEAD,
): ScheduleDay[] {
  return Array.from({ length: daysCount }, (_, dayOffset) => {
    const dateKey = getDateKeyForOffset(dayOffset);
    const reservedKeys = generateReservedKeys(clubId, dateKey, resources, times, dayOffset);

    return {
      dateKey,
      label: formatScheduleDayLabel(dateKey),
      resources,
      rows: buildRows(clubId, dateKey, resources, times, reservedKeys),
    };
  });
}

export function formatDatePickerOption(dateKey: string): string {
  const date = parseLocalDateKey(dateKey);
  const weekday = date.toLocaleDateString(undefined, { weekday: 'long' });
  const full = date.toLocaleDateString(undefined, {
    day: 'numeric',
    month: 'long',
  });
  const relative = formatScheduleDayLabel(dateKey);

  if (relative === 'Today' || relative === 'Tomorrow') {
    return `${relative} · ${weekday} ${full}`;
  }

  return `${weekday}, ${full}`;
}
