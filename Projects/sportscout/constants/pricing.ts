import type { Sport } from './sports';

export type PriceCurrency = 'CZK';

export type PriceUnit = 'hour' | 'session';

/** Pricing for a club — varies by sport, time of day, and resource. */
export type ClubPricing = {
  currency: PriceCurrency;
  unit: PriceUnit;
  /** Standard weekday off-peak price. */
  standardPrice: number;
  /** Price during peak hours (evenings). */
  peakPrice: number;
  peakHoursFrom: string;
  peakHoursTo: string;
  /** Optional weekend rate (Sat–Sun). */
  weekendPrice?: number;
  /** Some resources cost more (e.g. clay courts vs hard courts). */
  resourcePrices?: Record<string, number>;
  /** Optional monthly membership. */
  membershipMonthly?: number;
  /** Add-ons like equipment rental. */
  extras?: { label: string; price: number }[];
};

/**
 * Example baseline prices by sport — clubs can charge above or below these.
 */
export const SPORT_PRICE_GUIDE: Record<
  Sport,
  { typicalRange: string; unit: PriceUnit; note: string }
> = {
  Badminton: { typicalRange: '250–420 Kč', unit: 'hour', note: 'Per court, 1 hour' },
  Football: { typicalRange: '900–1 600 Kč', unit: 'hour', note: 'Per pitch, 1 hour' },
  Tennis: { typicalRange: '400–600 Kč', unit: 'hour', note: 'Per court, 1 hour' },
  Yoga: { typicalRange: '180–350 Kč', unit: 'session', note: 'Per class or studio hour' },
  Basketball: { typicalRange: '300–500 Kč', unit: 'hour', note: 'Per half-court or full court' },
  Swimming: { typicalRange: '120–200 Kč', unit: 'session', note: 'Pool entry or lane rental' },
  Volleyball: { typicalRange: '280–450 Kč', unit: 'hour', note: 'Per court' },
  'Martial Arts': { typicalRange: '200–400 Kč', unit: 'session', note: 'Per training session' },
  Paddle: { typicalRange: '300–480 Kč', unit: 'hour', note: 'Per court' },
};

export function formatPrice(amount: number, currency: PriceCurrency = 'CZK'): string {
  return `${amount.toLocaleString('cs-CZ')} ${currency === 'CZK' ? 'Kč' : currency}`;
}

export function formatPriceWithUnit(pricing: ClubPricing): string {
  const unitLabel = pricing.unit === 'hour' ? '/ hod' : '/ lekce';
  return `${formatPrice(pricing.standardPrice, pricing.currency)}${unitLabel}`;
}

export function getMinimumPrice(pricing: ClubPricing): number {
  const resourcePrices = pricing.resourcePrices
    ? Object.values(pricing.resourcePrices)
    : [];
  return Math.min(pricing.standardPrice, pricing.peakPrice, pricing.weekendPrice ?? Infinity, ...resourcePrices);
}
