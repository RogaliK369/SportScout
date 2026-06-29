import { router } from 'expo-router';
import { useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { LoginBrandHeader } from '@/components/LoginBrandHeader';
import { ScreenContainer } from '@/components/ScreenContainer';
import { SectionLabel } from '@/components/SectionLabel';
import { SportChip } from '@/components/SportChip';
import { TextField } from '@/components/TextField';
import { Colors, Routes, SPORTS, type Sport } from '@/constants';
import { loginUser } from '@/lib/api';
import { useAuth } from '@/lib/auth';

/**
 * Login screen: optional name & email, sport interests required.
 */
export default function LoginScreen() {
  const { login } = useAuth();
  const [name, setName] = useState('');
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
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (selectedSports.length === 0) {
      setError('Pick at least one sport. You can add more later in your profile.');
      return;
    }

    setError('');
    setIsLoading(true);

    try {
      await loginUser({ name: trimmedName, email: trimmedEmail, sports: selectedSports });
      login({ name: trimmedName, email: trimmedEmail, sports: selectedSports, photoUri: null });
      router.replace(Routes.home);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <LoginBrandHeader subtitle="Find local clubs and training sessions in your city." />

        <TextField
          label="Your name (optional)"
          placeholder="Alex"
          autoCapitalize="words"
          autoComplete="name"
          value={name}
          onChangeText={setName}
        />

        <TextField
          label="Email (optional)"
          placeholder="you@example.com"
          autoCapitalize="none"
          autoComplete="email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <SectionLabel>Which sports interest you?</SectionLabel>
        <Text style={styles.hint}>Select one or more. You can change this later.</Text>

        <View style={styles.sportGrid}>
          {SPORTS.map((sport) => (
            <SportChip
              key={sport}
              sport={sport}
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
  hint: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginTop: -4,
    marginBottom: 12,
  },
  sportGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
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
