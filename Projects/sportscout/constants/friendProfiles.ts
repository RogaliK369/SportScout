import type { Sport } from './sports';

export type FriendProfile = {
  id: string;
  name: string;
  sports: Sport[];
  bio: string;
  area: string;
};

/**
 * Sample people looking for training partners.
 * Replace with real users from your backend later.
 */
export const MOCK_FRIEND_PROFILES: FriendProfile[] = [
  {
    id: 'anna',
    name: 'Anna K.',
    sports: ['Badminton', 'Tennis'],
    bio: 'Looking for doubles partners on weekday evenings.',
    area: 'Downtown',
  },
  {
    id: 'mark',
    name: 'Mark T.',
    sports: ['Football', 'Basketball'],
    bio: 'Casual 5-a-side football, open to new teams.',
    area: 'Riverside',
  },
  {
    id: 'sofia',
    name: 'Sofia M.',
    sports: ['Badminton', 'Paddle'],
    bio: 'Intermediate badminton — happy to drill smashes and footwork.',
    area: 'North Side',
  },
  {
    id: 'james',
    name: 'James L.',
    sports: ['Martial Arts', 'Yoga'],
    bio: 'Training for flexibility and sparring sessions.',
    area: 'West Park',
  },
  {
    id: 'elena',
    name: 'Elena R.',
    sports: ['Badminton', 'Swimming'],
    bio: 'New in the city, want to find a regular badminton partner.',
    area: 'Sport Hall Nova area',
  },
  {
    id: 'tom',
    name: 'Tom W.',
    sports: ['Tennis', 'Paddle'],
    bio: 'Weekend paddle and tennis — all levels welcome.',
    area: 'City Center',
  },
  {
    id: 'lisa',
    name: 'Lisa P.',
    sports: ['Volleyball', 'Yoga'],
    bio: 'Beach volleyball in summer, yoga year-round.',
    area: 'South District',
  },
];
