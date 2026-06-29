import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ClubMap } from '@/components/ClubMap';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { Colors, MOCK_CLUBS, Routes, SPORT_ICONS, Theme, formatPrice } from '@/constants';
import { useAuth } from '@/lib/auth';

/**
 * Home screen: map of local sports clubs + club list.
 */
export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScreenContainer style={styles.container}>
      <ScreenHeader
        title="Nearby"
        accent="Clubs"
        subtitle={
          user?.name
            ? `Hi ${user.name}! Tap a club for photos, facilities, and booking.`
            : 'Tap a club for photos, facilities, and to reserve a time slot.'
        }
      />

      <ClubMap />

      <ScrollView
        style={styles.listScroll}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <SectionLabel>Clubs near you</SectionLabel>

        {MOCK_CLUBS.map((club) => (
          <Pressable
            key={club.id}
            onPress={() => router.push(Routes.clubDetail(club.id))}
            style={({ pressed }) => [styles.clubCard, pressed && styles.clubCardPressed]}>
            <View style={styles.clubIconCircle}>
              <Text style={styles.clubIcon}>{SPORT_ICONS[club.sport]}</Text>
            </View>
            <View style={styles.clubInfo}>
              <Text style={styles.clubName}>{club.name}</Text>
              <Text style={styles.clubSport}>{club.sport}</Text>
              <Text style={styles.clubPrice}>
                from {formatPrice(club.priceFrom, club.currency)}
                {club.priceUnit === 'hour' ? '/hod' : '/lekce'}
              </Text>
              <Text style={styles.clubMeta}>{club.address}</Text>
              <Text style={styles.tapHint}>Tap for details & booking →</Text>
            </View>
          </Pressable>
        ))}

        {user && user.sports.length > 0 ? (
          <View style={styles.footer}>
            <SectionLabel>Your sports</SectionLabel>
            <View style={styles.sportPills}>
              {user.sports.map((sport) => (
                <View key={sport} style={styles.sportPill}>
                  <Text style={styles.sportPillText}>
                    {SPORT_ICONS[sport]} {sport}
                  </Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  listScroll: {
    flex: 1,
    marginTop: 16,
  },
  scrollContent: {
    paddingBottom: 24,
  },
  clubCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    ...Theme.card,
    padding: 14,
    marginBottom: 10,
  },
  clubCardPressed: {
    opacity: 0.92,
    borderColor: Colors.primary,
  },
  clubIconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  clubIcon: {
    fontSize: 24,
  },
  clubInfo: {
    flex: 1,
  },
  clubName: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 2,
  },
  clubSport: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primary,
    marginBottom: 2,
  },
  clubPrice: {
    fontSize: 14,
    fontWeight: '800',
    color: Colors.primaryDark,
    marginBottom: 4,
  },
  clubMeta: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 6,
  },
  tapHint: {
    fontSize: 13,
    fontWeight: '700',
    color: Colors.primary,
  },
  footer: {
    marginTop: 8,
  },
  sportPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sportPill: {
    backgroundColor: Colors.primaryLight,
    borderRadius: Theme.radius.pill,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  sportPillText: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.primaryDark,
  },
});
