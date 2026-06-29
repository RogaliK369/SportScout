import type { Sport } from './sports';

export type EventType = 'training' | 'tournament';

export type SportEvent = {
  id: string;
  title: string;
  club: string;
  sport: Sport;
  type: EventType;
  /** ISO date string — used to sort by nearest time */
  startsAt: string;
  location: string;
  spotsLeft: number;
};

/**
 * Sample events for development — locations in Prague.
 * Replace with real API data in lib/api.ts later.
 */
export const MOCK_EVENTS: SportEvent[] = [
  {
    id: '1',
    title: 'Beginner Badminton Drills',
    club: 'Smash Point Club',
    sport: 'Badminton',
    type: 'training',
    startsAt: hoursFromNow(3),
    location: 'Sportovní hala Stromovka, Praha 7',
    spotsLeft: 6,
  },
  {
    id: '2',
    title: 'Mixed Doubles Practice',
    club: 'City Shuttle Arena',
    sport: 'Badminton',
    type: 'training',
    startsAt: hoursFromNow(8),
    location: 'Vinohradská 12, Praha 2',
    spotsLeft: 4,
  },
  {
    id: '3',
    title: 'Friday Night Football Training',
    club: 'Urban Kick FC',
    sport: 'Football',
    type: 'training',
    startsAt: hoursFromNow(12),
    location: 'Stromovka, Praha 7',
    spotsLeft: 10,
  },
  {
    id: '4',
    title: 'Spring Badminton Open',
    club: 'Arena Badminton Center',
    sport: 'Badminton',
    type: 'tournament',
    startsAt: hoursFromNow(26),
    location: 'Karlínské náměstí 8, Praha 8',
    spotsLeft: 32,
  },
  {
    id: '5',
    title: 'Intermediate Smash & Footwork',
    club: 'Smash Point Club',
    sport: 'Badminton',
    type: 'training',
    startsAt: hoursFromNow(30),
    location: 'Sportovní hala Stromovka, Praha 7',
    spotsLeft: 8,
  },
  {
    id: '6',
    title: 'Morning Yoga Flow',
    club: 'Calm Studio',
    sport: 'Yoga',
    type: 'training',
    startsAt: hoursFromNow(40),
    location: 'Náměstí Míru 15, Praha 2',
    spotsLeft: 12,
  },
  {
    id: '7',
    title: 'City Badminton League — Round 2',
    club: 'City Shuttle Arena',
    sport: 'Badminton',
    type: 'tournament',
    startsAt: hoursFromNow(52),
    location: 'Vinohradská 12, Praha 2',
    spotsLeft: 16,
  },
  {
    id: '8',
    title: 'Tennis Rally Session',
    club: 'Baseline Tennis Club',
    sport: 'Tennis',
    type: 'training',
    startsAt: hoursFromNow(60),
    location: 'Letná, Praha 7',
    spotsLeft: 5,
  },
  {
    id: '9',
    title: 'Evening Paddle Social',
    club: 'City Shuttle Arena',
    sport: 'Paddle',
    type: 'training',
    startsAt: hoursFromNow(6),
    location: 'Vinohradská 12, Praha 2',
    spotsLeft: 8,
  },
  {
    id: '10',
    title: 'Basketball Pick-up Game',
    club: 'Urban Kick FC',
    sport: 'Basketball',
    type: 'training',
    startsAt: hoursFromNow(28),
    location: 'Stromovka, Praha 7',
    spotsLeft: 14,
  },
];

function hoursFromNow(hours: number): string {
  const date = new Date();
  date.setHours(date.getHours() + hours);
  date.setMinutes(0, 0, 0);
  return date.toISOString();
}
