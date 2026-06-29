import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Theme, SPORT_ICONS, type FriendProfile } from '@/constants';
import { getSharedSports } from '@/lib/friends';

type FriendCardProps = {
  profile: FriendProfile;
  userSports: FriendProfile['sports'];
  requestSent: boolean;
  onSendRequest: () => void;
};

/**
 * One person in the sport friends list.
 */
export function FriendCard({ profile, userSports, requestSent, onSendRequest }: FriendCardProps) {
  const sharedSports = getSharedSports(userSports, profile.sports);

  return (
    <View style={styles.card}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{profile.name.charAt(0)}</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.area}>{profile.area}</Text>
        <Text style={styles.bio}>{profile.bio}</Text>

        <View style={styles.sportRow}>
          {sharedSports.map((sport) => (
            <View key={sport} style={styles.sportPill}>
              <Text style={styles.sportPillText}>
                {SPORT_ICONS[sport]} {sport}
              </Text>
            </View>
          ))}
        </View>

        <Pressable
          accessibilityRole="button"
          disabled={requestSent}
          onPress={onSendRequest}
          style={[styles.button, requestSent && styles.buttonSent]}>
          <Text style={[styles.buttonText, requestSent && styles.buttonTextSent]}>
            {requestSent ? 'Request sent ✓' : 'Add friend'}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    ...Theme.card,
    padding: 14,
    marginBottom: 12,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primaryLight,
    borderWidth: 2,
    borderColor: Colors.primaryMuted,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  content: {
    flex: 1,
  },
  name: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  area: {
    fontSize: 13,
    color: Colors.primary,
    fontWeight: '600',
    marginBottom: 6,
  },
  bio: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
    marginBottom: 10,
  },
  sportRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 12,
  },
  sportPill: {
    backgroundColor: Colors.primarySoft,
    borderRadius: Theme.radius.pill,
    paddingVertical: 5,
    paddingHorizontal: 10,
    marginRight: 6,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sportPillText: {
    fontSize: 12,
    color: Colors.primaryDark,
    fontWeight: '600',
  },
  button: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primary,
    borderRadius: Theme.radius.sm,
    paddingVertical: 9,
    paddingHorizontal: 16,
  },
  buttonSent: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  buttonText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '700',
  },
  buttonTextSent: {
    color: Colors.textSecondary,
  },
});
