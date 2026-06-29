import { router } from 'expo-router';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { Colors, Routes, SPORT_ICONS, Theme } from '@/constants';
import { useAuth } from '@/lib/auth';

/**
 * Profile screen: shows user info and lets them log out.
 */
export default function ProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    router.replace(Routes.login);
  };

  return (
    <ScreenContainer>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
        <ScreenHeader title="Your" accent="Profile" subtitle="Your account and sport preferences." />

        <View style={styles.avatarSection}>
          <ProfileAvatar photoUri={user?.photoUri} name={user?.name} size={96} />
        </View>

        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Name</Text>
            <Text style={styles.value}>{user?.name || 'Not set'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <Text style={styles.label}>Email</Text>
            <Text style={styles.value}>{user?.email || 'Not set'}</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.row}>
            <SectionLabel>Sports</SectionLabel>
            {user && user.sports.length > 0 ? (
              <View style={styles.sportPills}>
                {user.sports.map((sport) => (
                  <View key={sport} style={styles.sportPill}>
                    <Text style={styles.sportPillText}>
                      {SPORT_ICONS[sport]} {sport}
                    </Text>
                  </View>
                ))}
              </View>
            ) : (
              <Text style={styles.value}>No sports selected</Text>
            )}
          </View>
        </View>

        <Button title="Edit details & sports" onPress={() => router.push(Routes.editProfile)} />
        <View style={styles.spacer} />
        <Button title="Log out" variant="secondary" onPress={handleLogout} />
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  avatarSection: {
    alignItems: 'center',
    marginTop: -8,
    marginBottom: 20,
  },
  card: {
    ...Theme.card,
    padding: 18,
    marginBottom: 24,
  },
  row: {
    paddingVertical: 4,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.borderLight,
    marginVertical: 14,
  },
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 4,
  },
  value: {
    fontSize: 16,
    fontWeight: '500',
    color: Colors.text,
  },
  sportPills: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 4,
  },
  sportPill: {
    backgroundColor: Colors.primarySoft,
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
  spacer: {
    height: 12,
  },
});
