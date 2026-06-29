import { CLUB_DETAILS } from './clubDetails';
import { getMinimumPrice } from './pricing';
import type { Sport } from './sports';

export type Club = {
  id: string;
  name: string;
  sport: Sport;
  address: string;
  latitude: number;
  longitude: number;
  /** Lowest bookable price at this club (for list previews). */
  priceFrom: number;
  currency: 'CZK';
  priceUnit: 'hour' | 'session';
};

/** List view of clubs (same data as detail records). */
export const MOCK_CLUBS: Club[] = CLUB_DETAILS.map(
  ({ id, name, sport, address, latitude, longitude, pricing }) => ({
    id,
    name,
    sport,
    address,
    latitude,
    longitude,
    priceFrom: getMinimumPrice(pricing),
    currency: pricing.currency,
    priceUnit: pricing.unit,
  }),
);

/** Default map center — Prague, Czechia. */
export const MAP_REGION = {
  latitude: 50.0755,
  longitude: 14.4378,
  latitudeDelta: 0.06,
  longitudeDelta: 0.06,
};

export {
  CLUB_DETAILS,
  getClubDetail,
  type ClubDetail,
  type FacilityType,
  type ScheduleDay,
  type ScheduleRow,
  type ScheduleCell,
  type SlotStatus,
} from './clubDetails';

export {
  SPORT_PRICE_GUIDE,
  formatPrice,
  formatPriceWithUnit,
  getMinimumPrice,
  type ClubPricing,
  type PriceCurrency,
  type PriceUnit,
} from './pricing';
