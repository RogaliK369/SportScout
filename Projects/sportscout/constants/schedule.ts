export type SlotStatus = 'available' | 'reserved' | 'mine';

export type ScheduleCell = {
  slotId: string;
  status: SlotStatus;
};

export type ScheduleRow = {
  time: string;
  cells: ScheduleCell[];
};

export type ScheduleDay = {
  dateKey: string;
  label: string;
  resources: string[];
  rows: ScheduleRow[];
};

export const SCHEDULE_DAYS_AHEAD = 14;
