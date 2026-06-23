/**
 * Sports users can pick during onboarding.
 * You can add more options here later.
 */
export const SPORTS = [
  'Football',
  'Basketball',
  'Tennis',
  'Swimming',
  'Running',
  'Volleyball',
  'Boxing',
  'Yoga',
] as const;

export type Sport = (typeof SPORTS)[number];
