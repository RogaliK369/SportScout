import { formatPrice } from '@/constants/pricing';
import {
  formatSlotDateTimeLabel,
  getLocalDateKey,
  isTodayDateKey,
  isTomorrowDateKey,
  buildLocalSlotDate,
} from '@/constants/dates';

/** Hours before a slot when free cancellation still applies. */
export const CANCELLATION_NOTICE_HOURS = 24;

/** Late cancellation fee = 50% of the slot price. */
export const CANCELLATION_FINE_RATE = 0.5;

export type ParsedSlot = {
  clubId: string;
  dateKey: string;
  time: string;
  resourceIndex: number;
};

export type CancellationAssessment = {
  canCancelFree: boolean;
  isToday: boolean;
  isTomorrow: boolean;
  hoursUntilSlot: number;
  fineAmount: number;
  slotDateTimeLabel: string;
  reason: 'free' | 'late_notice' | 'today' | 'started';
};

/**
 * Parses slot ids like `smash-point:2025-06-23:10:00:0`.
 */
export function parseSlotId(slotId: string): ParsedSlot | null {
  const parts = slotId.split(':');
  if (parts.length < 5) {
    return null;
  }

  const resourceIndex = Number(parts[parts.length - 1]);
  const minute = parts[parts.length - 2];
  const hour = parts[parts.length - 3];
  const dateKey = parts[parts.length - 4];
  const clubId = parts.slice(0, parts.length - 4).join(':');

  if (!clubId || !dateKey || Number.isNaN(resourceIndex)) {
    return null;
  }

  return {
    clubId,
    dateKey,
    time: `${hour}:${minute}`,
    resourceIndex,
  };
}

export function getSlotStartDate(dateKey: string, time: string): Date {
  return buildLocalSlotDate(dateKey, time);
}

export function getHoursUntilSlot(dateKey: string, time: string): number {
  const slotStart = getSlotStartDate(dateKey, time);
  return (slotStart.getTime() - Date.now()) / (1000 * 60 * 60);
}

export function canCancelWithoutFine(dateKey: string, time: string): boolean {
  return assessCancellation(dateKey, time, 0).canCancelFree;
}

/**
 * Decides whether a cancellation is free and how much fine applies.
 */
export function assessCancellation(
  dateKey: string,
  time: string,
  slotPrice: number,
): CancellationAssessment {
  const hoursUntilSlot = getHoursUntilSlot(dateKey, time);
  const isToday = isTodayDateKey(dateKey);
  const isTomorrow = isTomorrowDateKey(dateKey);
  const slotDateTimeLabel = formatSlotDateTimeLabel(dateKey, time);

  if (hoursUntilSlot <= 0) {
    return {
      canCancelFree: false,
      isToday,
      isTomorrow,
      hoursUntilSlot,
      fineAmount: slotPrice,
      slotDateTimeLabel,
      reason: 'started',
    };
  }

  if (hoursUntilSlot >= CANCELLATION_NOTICE_HOURS) {
    return {
      canCancelFree: true,
      isToday,
      isTomorrow,
      hoursUntilSlot,
      fineAmount: 0,
      slotDateTimeLabel,
      reason: 'free',
    };
  }

  const fineAmount = Math.max(Math.round(slotPrice * CANCELLATION_FINE_RATE), 0);

  return {
    canCancelFree: false,
    isToday,
    isTomorrow,
    hoursUntilSlot,
    fineAmount,
    slotDateTimeLabel,
    reason: isToday ? 'today' : 'late_notice',
  };
}

export function buildCancellationMessage(
  assessment: CancellationAssessment,
  resource: string,
  clubName: string,
): string {
  const slotLine = `${resource} · ${assessment.slotDateTimeLabel} · ${clubName}`;

  if (assessment.canCancelFree) {
    return `Cancel your booking?\n\n${slotLine}\n\nYou are cancelling more than 24 hours before the slot — no fee will be charged.`;
  }

  if (assessment.reason === 'started') {
    return `Cancel your booking?\n\n${slotLine}\n\nThis slot has already started or passed. A full cancellation fee applies.`;
  }

  const whenNote = assessment.isToday
    ? 'This slot is today and starts in less than 24 hours.'
    : `This slot starts in ${Math.ceil(assessment.hoursUntilSlot)} hours (less than the 24-hour notice period).`;

  return `Cancel your booking?\n\n${slotLine}\n\n${whenNote}\n\nA cancellation fee of ${formatPrice(assessment.fineAmount)} will be charged.`;
}

export const CANCELLATION_POLICY_TEXT =
  'Free cancellation is available if you cancel at least 24 hours before your slot. Late cancellations incur a 50% fee.';

export const CANCELLATION_LATE_TEXT =
  'This slot starts in less than 24 hours. A cancellation fee of 50% of the slot price applies.';

/** Re-export for convenience */
export { getLocalDateKey, isTodayDateKey } from '@/constants/dates';
