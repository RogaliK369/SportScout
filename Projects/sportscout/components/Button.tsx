import { Platform, Pressable, StyleSheet, Text, type PressableProps } from 'react-native';

import { Colors, Theme } from '@/constants';

type ButtonProps = PressableProps & {
  title: string;
  variant?: 'primary' | 'secondary';
};

/**
 * Reusable button used across screens.
 */
export function Button({ title, variant = 'primary', style, disabled, ...props }: ButtonProps) {
  const isPrimary = variant === 'primary';

  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={({ pressed }) => [
        styles.base,
        isPrimary ? styles.primary : styles.secondary,
        disabled && styles.disabled,
        pressed && !disabled && styles.pressed,
        style,
      ]}
      {...props}>
      <Text style={[styles.label, isPrimary ? styles.primaryLabel : styles.secondaryLabel]}>
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  base: {
    borderRadius: Theme.radius.md,
    paddingVertical: 15,
    paddingHorizontal: 22,
    alignItems: 'center',
  },
  primary: {
    backgroundColor: Colors.primary,
    ...Platform.select({
      ios: {
        shadowColor: Colors.primaryDark,
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.25,
        shadowRadius: 8,
      },
      android: {
        elevation: 4,
      },
      default: {},
    }),
  },
  secondary: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.98 }],
  },
  label: {
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 0.3,
  },
  primaryLabel: {
    color: Colors.white,
  },
  secondaryLabel: {
    color: Colors.primaryDark,
  },
});
