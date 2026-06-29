/**
 * Sports users can pick during onboarding.
 * You can add more options here later.
 */
export const SPORTS = [
  'Football',
  'Basketball',
  'Tennis',
  'Swimming',
  'Volleyball',
  'Martial Arts',
  'Yoga',
  'Badminton',
  'Paddle',
] as const;

export type Sport = (typeof SPORTS)[number];

/** Emoji icons shown on the login sport picker (no extra image files needed). */
export const SPORT_ICONS: Record<Sport, string> = {
  Football: '⚽',
  Basketball: '🏀',
  Tennis: '🎾',
  Swimming: '🏊',
  Volleyball: '🏐',
  'Martial Arts': '🥋',
  Yoga: '🧘',
  Badminton: '🏸',
  Paddle: '🏓',
};
