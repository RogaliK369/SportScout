import { router } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ScreenContainer } from '@/components/ScreenContainer';
import { Colors, Routes } from '@/constants';
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
      <Text style={styles.title}>Profile</Text>
      <Text style={styles.subtitle}>Your account and sport preferences.</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Email</Text>
        <Text style={styles.value}>{user?.email ?? '—'}</Text>

        <Text style={[styles.label, styles.spacing]}>Sports</Text>
        <Text style={styles.value}>
          {user && user.sports.length > 0 ? user.sports.join(', ') : 'No sports selected'}
        </Text>
      </View>

      <Button title="Log out" variant="secondary" onPress={handleLogout} />
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
    marginBottom: 24,
  },
  card: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  value: {
    fontSize: 16,
    color: Colors.text,
    marginTop: 4,
  },
  spacing: {
    marginTop: 16,
  },
});
