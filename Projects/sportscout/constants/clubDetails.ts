import type { Sport } from './sports';
import type { ClubPricing } from './pricing';
import { buildMultiDaySchedule } from './scheduleBuilder';
import type { ScheduleDay } from './schedule';

export type { ScheduleDay, ScheduleRow, ScheduleCell, SlotStatus } from './schedule';

export type FacilityType = 'courts' | 'gym' | 'studio';

export type ClubDetail = {
  id: string;
  name: string;
  sport: Sport;
  address: string;
  latitude: number;
  longitude: number;
  description: string;
  photos: string[];
  facilityType: FacilityType;
  courtCount: number;
  /** Column labels for the schedule grid (courts, pitches, rooms, etc.) */
  resources: string[];
  /** Present when facilityType is 'gym' or 'studio' with equipment */
  machines?: string[];
  pricing: ClubPricing;
  schedule: ScheduleDay[];
};

function photo(seed: string, index: number): string {
  return `https://picsum.photos/seed/${seed}-${index}/640/400`;
}

const TIMES_DAY = ['08:00', '09:00', '10:00', '11:00', '12:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];
const TIMES_EVENING = ['10:00', '11:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'];

const SMASH_RESOURCES = ['Court 1', 'Court 2', 'Court 3', 'Court 4'];
const SHUTTLE_RESOURCES = ['Court A', 'Court B', 'Court C', 'Court D', 'Court E', 'Court F'];
const ARENA_RESOURCES = ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'];
const URBAN_RESOURCES = ['Pitch 1', 'Pitch 2', 'Pitch 3'];
const CALM_RESOURCES = ['Studio A', 'Studio B', 'Gym floor'];
const BASELINE_RESOURCES = ['Clay 1', 'Clay 2', 'Hard 1', 'Hard 2', 'Hard 3'];

/**
 * Rich club profiles with photos, facilities, and booking schedules.
 */
export const CLUB_DETAILS: ClubDetail[] = [
  {
    id: 'smash-point',
    name: 'Smash Point Club',
    sport: 'Badminton',
    address: 'Sportovní hala Stromovka, Praha 7',
    latitude: 50.1058,
    longitude: 14.4245,
    description: 'Modern badminton hall with wooden courts and pro shop.',
    photos: [photo('smash', 1), photo('smash', 2), photo('smash', 3)],
    facilityType: 'courts',
    courtCount: 4,
    resources: ['Court 1', 'Court 2', 'Court 3', 'Court 4'],
    pricing: {
      currency: 'CZK',
      unit: 'hour',
      standardPrice: 280,
      peakPrice: 350,
      peakHoursFrom: '17:00',
      peakHoursTo: '21:00',
      weekendPrice: 320,
      membershipMonthly: 890,
      extras: [
        { label: 'Racket rental', price: 60 },
        { label: 'Shuttlecock tube', price: 45 },
      ],
    },
    schedule: buildMultiDaySchedule('smash-point', SMASH_RESOURCES, TIMES_DAY),
  },
  {
    id: 'city-shuttle',
    name: 'City Shuttle Arena',
    sport: 'Badminton',
    address: 'Vinohradská 12, Praha 2',
    latitude: 50.0752,
    longitude: 14.4518,
    description: 'Downtown arena popular for doubles leagues and open play.',
    photos: [photo('shuttle', 1), photo('shuttle', 2), photo('shuttle', 3), photo('shuttle', 4)],
    facilityType: 'courts',
    courtCount: 6,
    resources: ['Court A', 'Court B', 'Court C', 'Court D', 'Court E', 'Court F'],
    pricing: {
      currency: 'CZK',
      unit: 'hour',
      standardPrice: 320,
      peakPrice: 420,
      peakHoursFrom: '17:00',
      peakHoursTo: '21:00',
      weekendPrice: 380,
      membershipMonthly: 1100,
      extras: [{ label: 'Pro coaching (1 h)', price: 450 }],
    },
    schedule: buildMultiDaySchedule('city-shuttle', SHUTTLE_RESOURCES, TIMES_DAY),
  },
  {
    id: 'arena-badminton',
    name: 'Arena Badminton Center',
    sport: 'Badminton',
    address: 'Karlínské náměstí 8, Praha 8',
    latitude: 50.0924,
    longitude: 14.4489,
    description: 'Tournament-grade center with spectator seating.',
    photos: [photo('arena', 1), photo('arena', 2), photo('arena', 3)],
    facilityType: 'courts',
    courtCount: 8,
    resources: ['C1', 'C2', 'C3', 'C4', 'C5', 'C6'],
    pricing: {
      currency: 'CZK',
      unit: 'hour',
      standardPrice: 250,
      peakPrice: 310,
      peakHoursFrom: '16:00',
      peakHoursTo: '21:00',
      weekendPrice: 290,
      membershipMonthly: 750,
    },
    schedule: buildMultiDaySchedule('arena-badminton', ARENA_RESOURCES, TIMES_EVENING),
  },
  {
    id: 'urban-kick',
    name: 'Urban Kick FC',
    sport: 'Football',
    address: 'Stromovka, Praha 7',
    latitude: 50.1031,
    longitude: 14.4312,
    description: 'Outdoor pitches with floodlights and changing rooms.',
    photos: [photo('urban', 1), photo('urban', 2), photo('urban', 3)],
    facilityType: 'courts',
    courtCount: 3,
    resources: ['Pitch 1', 'Pitch 2', 'Pitch 3'],
    pricing: {
      currency: 'CZK',
      unit: 'hour',
      standardPrice: 1200,
      peakPrice: 1600,
      peakHoursFrom: '17:00',
      peakHoursTo: '21:00',
      weekendPrice: 1400,
      resourcePrices: {
        'Pitch 1': 1400,
        'Pitch 2': 1200,
        'Pitch 3': 1000,
      },
      extras: [
        { label: 'Floodlights', price: 200 },
        { label: 'Bibs set', price: 80 },
      ],
    },
    schedule: buildMultiDaySchedule('urban-kick', URBAN_RESOURCES, TIMES_EVENING),
  },
  {
    id: 'calm-studio',
    name: 'Calm Studio',
    sport: 'Yoga',
    address: 'Náměstí Míru 15, Praha 2',
    latitude: 50.0755,
    longitude: 14.4378,
    description: 'Bright studio with a full gym corner for strength and mobility.',
    photos: [photo('calm', 1), photo('calm', 2), photo('calm', 3)],
    facilityType: 'gym',
    courtCount: 2,
    resources: ['Studio A', 'Studio B', 'Gym floor'],
    machines: [
      'Treadmills (4)',
      'Rowing machines (2)',
      'Cable crossover',
      'Smith machine',
      'Dumbbells 2–40 kg',
      'Kettlebells',
      'Yoga mats & blocks',
      'Resistance bands wall',
    ],
    pricing: {
      currency: 'CZK',
      unit: 'session',
      standardPrice: 220,
      peakPrice: 280,
      peakHoursFrom: '17:00',
      peakHoursTo: '20:00',
      weekendPrice: 260,
      resourcePrices: {
        'Studio A': 350,
        'Studio B': 350,
        'Gym floor': 180,
      },
      membershipMonthly: 990,
      extras: [{ label: 'Yoga mat rental', price: 40 }],
    },
    schedule: buildMultiDaySchedule('calm-studio', CALM_RESOURCES, TIMES_DAY),
  },
  {
    id: 'baseline-tennis',
    name: 'Baseline Tennis Club',
    sport: 'Tennis',
    address: 'Letná, Praha 7',
    latitude: 50.0956,
    longitude: 14.4189,
    description: 'Clay and hard courts with ball machine rental.',
    photos: [photo('baseline', 1), photo('baseline', 2), photo('baseline', 3)],
    facilityType: 'courts',
    courtCount: 5,
    resources: ['Clay 1', 'Clay 2', 'Hard 1', 'Hard 2', 'Hard 3'],
    pricing: {
      currency: 'CZK',
      unit: 'hour',
      standardPrice: 450,
      peakPrice: 530,
      peakHoursFrom: '17:00',
      peakHoursTo: '21:00',
      weekendPrice: 500,
      resourcePrices: {
        'Clay 1': 520,
        'Clay 2': 520,
        'Hard 1': 450,
        'Hard 2': 450,
        'Hard 3': 420,
      },
      membershipMonthly: 1450,
      extras: [
        { label: 'Ball machine (30 min)', price: 150 },
        { label: 'Racket rental', price: 80 },
      ],
    },
    schedule: buildMultiDaySchedule('baseline-tennis', BASELINE_RESOURCES, TIMES_DAY),
  },
];

export function getClubDetail(id: string): ClubDetail | undefined {
  return CLUB_DETAILS.find((club) => club.id === id);
}
