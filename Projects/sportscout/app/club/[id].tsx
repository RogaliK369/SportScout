import { router, useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ClubPhotoGallery } from '@/components/ClubPhotoGallery';
import { ClubPricingCard } from '@/components/ClubPricingCard';
import { ClubScheduleGrid } from '@/components/ClubScheduleGrid';
import { ScheduleDatePicker } from '@/components/ScheduleDatePicker';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { Colors, SPORT_ICONS, Theme, getClubDetail } from '@/constants';
import { openInGoogleMaps } from '@/lib/maps';

/**
 * Club detail: photos, facilities, and bookable schedule grid.
 */
export default function ClubDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string | string[] }>();
  const clubId = Array.isArray(id) ? id[0] : id;
  const club = getClubDetail(clubId ?? '');
  const [dayIndex, setDayIndex] = useState(0);

  if (!club) {
    return (
      <ScreenContainer>
        <ScreenHeader title="Club" accent="Not found" onBack={() => router.back()} />
        <Text style={styles.missing}>This club could not be loaded.</Text>
      </ScreenContainer>
    );
  }

  const activeDay = club.schedule[dayIndex] ?? club.schedule[0];
  const facilityLabel =
    club.facilityType === 'gym'
      ? 'Gym & studio'
      : club.facilityType === 'studio'
        ? 'Studio rooms'
        : 'Courts & pitches';

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScreenHeader
          title={club.name}
          accent={club.sport}
          subtitle={club.address}
          onBack={() => router.back()}
        />

        <ClubPhotoGallery photos={club.photos} sportIcon={SPORT_ICONS[club.sport]} />

        <View style={styles.metaCard}>
          <Text style={styles.sportBadge}>
            {SPORT_ICONS[club.sport]} {club.sport}
          </Text>
          <Text style={styles.description}>{club.description}</Text>

          <View style={styles.statRow}>
            <StatBox label={facilityLabel} value={String(club.courtCount)} />
            <StatBox label="Resources" value={String(club.resources.length)} />
            <StatBox label="Photos" value={String(club.photos.length)} />
          </View>

          <Pressable
            onPress={() => openInGoogleMaps(club.latitude, club.longitude, club.name)}
            style={styles.mapsLink}>
            <Text style={styles.mapsLinkText}>Open in Google Maps →</Text>
          </Pressable>
        </View>

        {club.machines && club.machines.length > 0 ? (
          <View style={styles.section}>
            <SectionLabel>Exercise machines & equipment</SectionLabel>
            <View style={styles.machineCard}>
              {club.machines.map((machine) => (
                <View key={machine} style={styles.machineRow}>
                  <View style={styles.machineDot} />
                  <Text style={styles.machineText}>{machine}</Text>
                </View>
              ))}
            </View>
          </View>
        ) : null}

        <View style={styles.section}>
          <SectionLabel>Prices</SectionLabel>
          <ClubPricingCard pricing={club.pricing} sport={club.sport} />
        </View>

        <View style={styles.section}>
          <SectionLabel>Availability schedule</SectionLabel>
          <Text style={styles.scheduleHint}>
            Green slots can be reserved. Gray cells are already booked.
          </Text>

          <ScheduleDatePicker
            days={club.schedule}
            selectedIndex={dayIndex}
            onSelect={setDayIndex}
          />

          {activeDay ? (
            <ClubScheduleGrid day={activeDay} clubName={club.name} pricing={club.pricing} />
          ) : null}
        </View>
      </ScrollView>
    </ScreenContainer>
  );
}

function StatBox({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.statBox}>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  content: {
    paddingBottom: 32,
  },
  missing: {
    fontSize: 16,
    color: Colors.textSecondary,
  },
  metaCard: {
    ...Theme.card,
    padding: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  sportBadge: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.primaryLight,
    color: Colors.primaryDark,
    fontSize: 13,
    fontWeight: '700',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: Theme.radius.pill,
    marginBottom: 10,
    overflow: 'hidden',
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.text,
    marginBottom: 14,
  },
  statRow: {
    flexDirection: 'row',
    marginBottom: 14,
    gap: 8,
  },
  statBox: {
    flex: 1,
    backgroundColor: Colors.primarySoft,
    borderRadius: Theme.radius.md,
    paddingVertical: 10,
    paddingHorizontal: 8,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
    textAlign: 'center',
    marginTop: 2,
  },
  mapsLink: {
    alignSelf: 'flex-start',
  },
  mapsLinkText: {
    fontSize: 14,
    fontWeight: '700',
    color: Colors.primary,
  },
  section: {
    marginTop: 16,
  },
  machineCard: {
    ...Theme.card,
    padding: 14,
  },
  machineRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  machineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: Colors.primary,
    marginRight: 10,
  },
  machineText: {
    fontSize: 14,
    color: Colors.text,
    flex: 1,
  },
  scheduleHint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: -4,
    marginBottom: 12,
    lineHeight: 18,
  },
});
