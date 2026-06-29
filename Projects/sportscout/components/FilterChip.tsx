import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants';

type FilterChipProps = {
  label: string;
  active: boolean;
  onPress: () => void;
  /** Show emoji or icon before the label. */
  leading?: string;
};

/** Pill-shaped filter chip used on the feed and elsewhere. */
export function FilterChip({ label, active, onPress, leading }: FilterChipProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.chip, active && styles.chipActive]}
      accessibilityRole="button"
      accessibilityState={{ selected: active }}>
      {leading ? <Text style={styles.leading}>{leading}</Text> : null}
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: 999,
    paddingVertical: 9,
    paddingHorizontal: 16,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  leading: {
    fontSize: 15,
    marginRight: 6,
  },
  label: {
    fontSize: 14,
    color: Colors.textSecondary,
    fontWeight: '500',
  },
  labelActive: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
});
