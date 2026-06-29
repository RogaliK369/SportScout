import { useMemo, useState } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

import { EventCard } from '@/components/EventCard';
import { FilterChip } from '@/components/FilterChip';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { Colors, SPORT_ICONS, SPORTS, type Sport } from '@/constants';
import {
  type EventFilter,
  type EventTimeFilter,
  getUpcomingEvents,
} from '@/lib/events';

const TYPE_FILTERS: { key: EventFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'training', label: 'Training' },
  { key: 'tournament', label: 'Tournaments' },
];

const TIME_FILTERS: { key: EventTimeFilter; label: string }[] = [
  { key: 'all', label: 'Any time' },
  { key: 'today', label: 'Today' },
  { key: 'tomorrow', label: 'Tomorrow' },
];

/**
 * Activity feed: upcoming trainings and tournaments with sport & time filters.
 */
export default function FeedScreen() {
  const [typeFilter, setTypeFilter] = useState<EventFilter>('all');
  const [timeFilter, setTimeFilter] = useState<EventTimeFilter>('all');
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);

  const events = useMemo(
    () =>
      getUpcomingEvents({
        type: typeFilter,
        sports: selectedSports,
        time: timeFilter,
      }),
    [typeFilter, selectedSports, timeFilter],
  );

  const toggleSport = (sport: Sport) => {
    setSelectedSports((current) =>
      current.includes(sport) ? current.filter((item) => item !== sport) : [...current, sport],
    );
  };

  return (
    <ScreenContainer style={styles.container}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventCard event={item} />}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
        ListHeaderComponent={
          <View>
            <ScreenHeader
              title="Activity"
              accent="Feed"
              subtitle="Filter by type, sport, and when it happens."
            />

            <View style={styles.filterCard}>
              <SectionLabel>Type</SectionLabel>
              <View style={styles.filters}>
                {TYPE_FILTERS.map(({ key, label }) => (
                  <FilterChip
                    key={key}
                    label={label}
                    active={typeFilter === key}
                    onPress={() => setTypeFilter(key)}
                  />
                ))}
              </View>

              <SectionLabel>When</SectionLabel>
              <View style={styles.filters}>
                {TIME_FILTERS.map(({ key, label }) => (
                  <FilterChip
                    key={key}
                    label={label}
                    active={timeFilter === key}
                    onPress={() => setTimeFilter(key)}
                  />
                ))}
              </View>

              <SectionLabel>Sports</SectionLabel>
              <Text style={styles.filterHint}>
                Tap to filter. Leave empty to show all sports.
              </Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.sportFilters}>
                {SPORTS.map((sport) => (
                  <FilterChip
                    key={sport}
                    label={sport}
                    leading={SPORT_ICONS[sport]}
                    active={selectedSports.includes(sport)}
                    onPress={() => toggleSport(sport)}
                  />
                ))}
              </ScrollView>
            </View>
          </View>
        }
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyIcon}>🏟️</Text>
            <Text style={styles.emptyText}>No events match these filters.</Text>
            <Text style={styles.emptyHint}>Try a different day or clear sport filters.</Text>
          </View>
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingBottom: 0,
  },
  filterCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    padding: 16,
    marginBottom: 16,
  },
  filterHint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: -4,
    marginBottom: 10,
  },
  filters: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  sportFilters: {
    paddingBottom: 4,
  },
  list: {
    paddingBottom: 24,
  },
  empty: {
    paddingTop: 32,
    alignItems: 'center',
  },
  emptyIcon: {
    fontSize: 40,
    marginBottom: 12,
  },
  emptyText: {
    color: Colors.text,
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 4,
  },
  emptyHint: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
  },
});
