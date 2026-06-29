import { Platform, StyleSheet, Text, View } from 'react-native';

import { Colors } from '@/constants';

type LoginBrandHeaderProps = {
  subtitle: string;
};

/**
 * Staggered SportScout logo + styled subtitle for the login screen.
 * Uses system fonts so Android loads instantly (no network font download).
 */
export function LoginBrandHeader({ subtitle }: LoginBrandHeaderProps) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.logoBlock}>
        <Text style={styles.sport}>Sport</Text>
        <Text style={styles.scout}>Scout</Text>
        <View style={styles.accentLine} />
      </View>

      <Text style={styles.subtitle}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 32,
    paddingTop: 8,
  },
  logoBlock: {
    marginBottom: 16,
  },
  sport: {
    fontFamily: Platform.select({ ios: 'Georgia', android: 'serif' }),
    fontSize: 58,
    lineHeight: 62,
    fontWeight: '700',
    color: Colors.text,
    letterSpacing: -1.5,
  },
  scout: {
    fontSize: 46,
    lineHeight: 50,
    fontWeight: '800',
    color: Colors.primary,
    letterSpacing: 3,
    marginTop: -6,
    marginLeft: 96,
    textTransform: 'uppercase',
  },
  accentLine: {
    alignSelf: 'stretch',
    width: '100%',
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.primary,
    marginTop: 14,
  },
  subtitle: {
    fontSize: 17,
    lineHeight: 26,
    fontWeight: '400',
    color: Colors.textSecondary,
    maxWidth: 320,
    letterSpacing: 0.2,
  },
});
