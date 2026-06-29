import type { FriendProfile } from '@/constants/friendProfiles';
import { MOCK_FRIEND_PROFILES } from '@/constants/friendProfiles';
import type { Sport } from '@/constants/sports';

/**
 * Returns people who share at least one sport with the current user.
 */
export function getMatchingProfiles(userSports: Sport[]): FriendProfile[] {
  if (userSports.length === 0) {
    return [];
  }

  return MOCK_FRIEND_PROFILES.filter((profile) =>
    profile.sports.some((sport) => userSports.includes(sport)),
  );
}

/**
 * Sports shared between the user and another profile.
 */
export function getSharedSports(userSports: Sport[], profileSports: Sport[]): Sport[] {
  return profileSports.filter((sport) => userSports.includes(sport));
}
