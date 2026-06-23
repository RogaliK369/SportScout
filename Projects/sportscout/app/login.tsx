import { router } from 'expo-router';
import { useState } from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { Button } from '@/components/Button';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SportChip } from '@/components/SportChip';
import { Colors, Routes, SPORTS, type Sport } from '@/constants';
import { loginUser } from '@/lib/api';
import { useAuth } from '@/lib/auth';

/**
 * Login screen: email + sport interests.
 * After login, users are taken to the Home tab.
 */
export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const toggleSport = (sport: Sport) => {
    setSelectedSports((current) =>
      current.includes(sport) ? current.filter((item) => item !== sport) : [...current, sport],
    );
  };

  const handleLogin = async () => {
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      setError('Please enter your email.');
      return;
    }

    if (selectedSports.length === 0) {
      setError('Pick at least one sport. You can add more later in your profile.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await loginUser({ email: trimmedEmail, sports: selectedSports });
      login(trimmedEmail, selectedSports);
      router.replace(Routes.home);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>SportScout</Text>
        <Text style={styles.subtitle}>
          Find local clubs and training sessions in your city.
        </Text>

        <Text style={styles.label}>Email</Text>
        <TextInput
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          placeholder="you@example.com"
          placeholderTextColor={Colors.textSecondary}
          style={styles.input}
          value={email}
          onChangeText={setEmail}
        />

        <Text style={styles.label}>Which sports interest you?</Text>
        <Text style={styles.hint}>Select one or more. You can change this later.</Text>

        <View style={styles.chipRow}>
          {SPORTS.map((sport) => (
            <SportChip
              key={sport}
              label={sport}
              selected={selectedSports.includes(sport)}
              onPress={() => toggleSport(sport)}
            />
          ))}
        </View>

        {error ? <Text style={styles.error}>{error}</Text> : null}

        {isLoading ? (
          <ActivityIndicator color={Colors.primary} style={styles.loader} />
        ) : (
          <Button title="Continue" onPress={handleLogin} />
        )}
      </ScrollView>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingBottom: 32,
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    color: Colors.text,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.textSecondary,
    marginBottom: 28,
    lineHeight: 22,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  hint: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 12,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 24,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  error: {
    color: Colors.error,
    marginBottom: 12,
  },
  loader: {
    marginTop: 8,
  },
});
