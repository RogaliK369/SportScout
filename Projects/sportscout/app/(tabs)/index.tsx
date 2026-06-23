import { StyleSheet, Text, View } from 'react-native';

import { ScreenContainer } from '@/components/ScreenContainer';
import { Colors } from '@/constants/colors';
import { useAuth } from '@/lib/auth';

/**
 * Home screen: will show a map of local clubs.
 * For now this is a simple placeholder you can expand later.
 */
export default function HomeScreen() {
  const { user } = useAuth();

  return (
    <ScreenContainer>
      <Text style={styles.title}>Nearby Clubs</Text>
      <Text style={styles.subtitle}>
        Welcome{user ? `, ${user.email}` : ''}! A map of local training clubs will appear here.
      </Text>

      <View style={styles.mapPlaceholder}>
        <Text style={styles.mapText}>Map coming soon</Text>
        <Text style={styles.mapHint}>
          You will be able to browse clubs and sign up for training sessions.
        </Text>
      </View>

      {user && user.sports.length > 0 ? (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Your sports</Text>
          <Text style={styles.sportsList}>{user.sports.join(' · ')}</Text>
        </View>
      ) : null}
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 15,
    color: Colors.textSecondary,
    lineHeight: 22,
    marginBottom: 20,
  },
  mapPlaceholder: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    marginBottom: 20,
  },
  mapText: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  mapHint: {
    fontSize: 14,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 6,
  },
  sportsList: {
    fontSize: 15,
    color: Colors.textSecondary,
  },
});
