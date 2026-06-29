import { router } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { ProfileAvatar } from '@/components/ProfileAvatar';
import { ScreenContainer } from '@/components/ScreenContainer';
import { ScreenHeader } from '@/components/ScreenHeader';
import { SectionLabel } from '@/components/SectionLabel';
import { SportChip } from '@/components/SportChip';
import { TextField } from '@/components/TextField';
import { Colors, SPORTS, type Sport } from '@/constants';
import { updateUserProfile } from '@/lib/api';
import { useAuth } from '@/lib/auth';

/**
 * Edit name, email, photo, and sport preferences.
 */
export default function EditProfileScreen() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [photoUri, setPhotoUri] = useState<string | null>(null);
  const [selectedSports, setSelectedSports] = useState<Sport[]>([]);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setPhotoUri(user.photoUri ?? null);
      setSelectedSports(user.sports);
    }
  }, [user]);

  const toggleSport = (sport: Sport) => {
    setSelectedSports((current) =>
      current.includes(sport) ? current.filter((item) => item !== sport) : [...current, sport],
    );
  };

  const handleSave = async () => {
    const trimmedName = name.trim();
    const trimmedEmail = email.trim();

    if (!trimmedName) {
      setError('Please enter your name.');
      return;
    }

    if (!trimmedEmail) {
      setError('Please enter your email.');
      return;
    }

    if (selectedSports.length === 0) {
      setError('Pick at least one sport.');
      return;
    }

    setError('');
    setIsLoading(true);

    const profile = {
      name: trimmedName,
      email: trimmedEmail,
      sports: selectedSports,
      photoUri,
    };

    try {
      await updateUserProfile(profile);
      updateProfile(profile);
      router.back();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScreenContainer>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <ScreenHeader
          title="Edit"
          accent="Profile"
          subtitle="Update your photo, details, and sports."
          onBack={() => router.back()}
        />

        <View style={styles.avatarSection}>
          <ProfileAvatar
            photoUri={photoUri}
            name={name}
            editable
            size={104}
            onPhotoChange={setPhotoUri}
          />
        </View>

        <TextField
          label="Your name"
          placeholder="Alex"
          autoCapitalize="words"
          value={name}
          onChangeText={setName}
        />

        <TextField
          label="Email"
          placeholder="you@example.com"
          autoCapitalize="none"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
        />

        <SectionLabel>Sports</SectionLabel>
        <Text style={styles.hint}>Tap to add or remove sports.</Text>

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
          <View style={styles.actions}>
            <Button title="Save changes" onPress={handleSave} />
            <View style={styles.spacer} />
            <Button title="Cancel" variant="secondary" onPress={() => router.back()} />
          </View>
        )}
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
    marginBottom: 8,
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
  actions: {
    marginTop: 4,
  },
  spacer: {
    height: 12,
  },
});
