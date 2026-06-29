import { StyleSheet, Text, View } from 'react-native';

import { Colors, Theme, SPORT_ICONS, type SportEvent } from '@/constants';
import { formatEventTime } from '@/lib/events';

type EventCardProps = {
  event: SportEvent;
};

/**
 * One row in the activity feed — shows club, time, and sport.
 */
export function EventCard({ event }: EventCardProps) {
  const typeLabel = event.type === 'training' ? 'Training' : 'Tournament';

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <View style={styles.iconCircle}>
          <Text style={styles.icon}>{SPORT_ICONS[event.sport]}</Text>
        </View>
        <View style={styles.headerText}>
          <Text style={styles.title}>{event.title}</Text>
          <Text style={styles.club}>{event.club}</Text>
        </View>
        <View style={[styles.badge, event.type === 'tournament' && styles.badgeTournament]}>
          <Text style={styles.badgeText}>{typeLabel}</Text>
        </View>
      </View>

      <View style={styles.metaRow}>
        <Text style={styles.time}>{formatEventTime(event.startsAt)}</Text>
        <Text style={styles.spots}>{event.spotsLeft} spots left</Text>
      </View>
      <Text style={styles.location}>{event.location}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    ...Theme.card,
    padding: Theme.cardPadding,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: Colors.primary,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  icon: {
    fontSize: 24,
  },
  headerText: {
    flex: 1,
    paddingRight: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  club: {
    fontSize: 14,
    color: Colors.textSecondary,
  },
  badge: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Theme.radius.sm,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  badgeTournament: {
    backgroundColor: Colors.primaryMuted,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  metaRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  time: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  location: {
    fontSize: 14,
    color: Colors.textSecondary,
    lineHeight: 20,
  },
  spots: {
    fontSize: 12,
    fontWeight: '600',
    color: Colors.primaryDark,
    backgroundColor: Colors.primarySoft,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Theme.radius.sm,
  },
});
