import type { ClubPricing } from '@/constants/pricing';
import { formatPrice } from '@/constants/pricing';

function parseTimeToMinutes(time: string): number {
  const [hours, minutes] = time.split(':').map(Number);
  return hours * 60 + minutes;
}

function isWeekend(dateKey: string): boolean {
  const [year, month, day] = dateKey.split('-').map(Number);
  const dayIndex = new Date(year, month - 1, day, 12, 0, 0, 0).getDay();
  return dayIndex === 0 || dayIndex === 6;
}

function isPeakHour(time: string, pricing: ClubPricing): boolean {
  const slot = parseTimeToMinutes(time);
  const from = parseTimeToMinutes(pricing.peakHoursFrom);
  const to = parseTimeToMinutes(pricing.peakHoursTo);
  return slot >= from && slot < to;
}

/**
 * Calculates the price for one bookable slot.
 */
export function getSlotPrice(
  pricing: ClubPricing,
  time: string,
  resource?: string,
  dateKey?: string,
): number {
  if (resource && pricing.resourcePrices?.[resource] !== undefined) {
    const base = pricing.resourcePrices[resource];
    if (dateKey && isWeekend(dateKey) && pricing.weekendPrice !== undefined) {
      return Math.max(base, pricing.weekendPrice);
    }
    if (isPeakHour(time, pricing)) {
      return Math.max(base, pricing.peakPrice);
    }
    return base;
  }

  if (dateKey && isWeekend(dateKey) && pricing.weekendPrice !== undefined) {
    return pricing.weekendPrice;
  }

  if (isPeakHour(time, pricing)) {
    return pricing.peakPrice;
  }

  return pricing.standardPrice;
}

export function getSlotPriceLabel(
  pricing: ClubPricing,
  time: string,
  resource?: string,
  dateKey?: string,
): string {
  const amount = getSlotPrice(pricing, time, resource, dateKey);
  const unit = pricing.unit === 'hour' ? '/ hod' : '/ lekce';
  return `${formatPrice(amount, pricing.currency)}${unit}`;
}

export function getPriceTierLabel(
  pricing: ClubPricing,
  time: string,
  dateKey?: string,
): 'Standard' | 'Peak' | 'Weekend' {
  if (dateKey && isWeekend(dateKey) && pricing.weekendPrice !== undefined) {
    return 'Weekend';
  }
  if (isPeakHour(time, pricing)) {
    return 'Peak';
  }
  return 'Standard';
}
