import Ionicons from '@expo/vector-icons/Ionicons';
import { Platform, Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants';

type ScreenHeaderProps = {
  title: string;
  /** Green accent word shown below the title, login-style. */
  accent?: string;
  subtitle?: string;
  onBack?: () => void;
};

/**
 * Branded screen title with green accent line — matches the login look.
 */
export function ScreenHeader({ title, accent, subtitle, onBack }: ScreenHeaderProps) {
  return (
    <View style={styles.wrapper}>
      {onBack ? (
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Go back"
          onPress={onBack}
          style={styles.backButton}>
          <Ionicons name="chevron-back" size={22} color={Colors.primary} />
          <Text style={styles.backLabel}>Back</Text>
        </Pressable>
      ) : null}

      <View style={styles.titleBlock}>
        <Text style={styles.title}>{title}</Text>
        {accent ? <Text style={styles.accent}>{accent}</Text> : null}
        <View style={styles.accentLine} />
      </View>

      {subtitle ? <Text style={styles.subtitle}>{subtitle}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    alignSelf: 'flex-start',
  },
  backLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.primary,
    marginLeft: 2,
  },
  titleBlock: {
    marginBottom: 4,
  },
  title: {
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontSize: 36,
    lineHeight: 40,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  accent: {
    fontSize: 28,
    lineHeight: 32,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 2.5,
    marginTop: -4,
    marginLeft: 4,
    textTransform: 'uppercase',
  },
  accentLine: {
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 10,
  },
  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    marginTop: 10,
    letterSpacing: 0.1,
  },
});
