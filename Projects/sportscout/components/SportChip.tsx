import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, Theme, SPORT_ICONS, type Sport } from '@/constants';

type SportChipProps = {
  sport: Sport;
  selected: boolean;
  onPress: () => void;
};

/**
 * Selectable sport tile with an icon and label.
 */
export function SportChip({ sport, selected, onPress }: SportChipProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      accessibilityLabel={sport}
      onPress={onPress}
      style={[styles.tile, selected && styles.tileSelected]}>
      <View style={[styles.iconCircle, selected && styles.iconCircleSelected]}>
        <Text style={styles.icon}>{SPORT_ICONS[sport]}</Text>
      </View>
      <Text style={[styles.label, selected && styles.labelSelected]} numberOfLines={2}>
        {sport}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  tile: {
    width: '30%',
    minWidth: 96,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.surface,
    borderRadius: Theme.radius.lg,
    paddingVertical: 14,
    paddingHorizontal: 6,
    marginBottom: 12,
  },
  tileSelected: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: Colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  iconCircleSelected: {
    backgroundColor: Colors.primaryMuted,
  },
  icon: {
    fontSize: 28,
  },
  label: {
    color: Colors.text,
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
  labelSelected: {
    color: Colors.primaryDark,
    fontWeight: '700',
  },
});
