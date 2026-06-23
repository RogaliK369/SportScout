import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/colors';

type SportChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

/**
 * Small selectable pill used on the login screen for sport interests.
 */
export function SportChip({ label, selected, onPress }: SportChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected && styles.chipSelected]}>
      <Text style={[styles.label, selected && styles.labelSelected]}>{label}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  chip: {
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
    marginRight: 8,
    marginBottom: 8,
  },
  chipSelected: {
    borderColor: Colors.primary,
    backgroundColor: '#E6F4EF',
  },
  label: {
    color: Colors.text,
    fontSize: 14,
  },
  labelSelected: {
    color: Colors.primaryDark,
    fontWeight: '600',
  },
});
