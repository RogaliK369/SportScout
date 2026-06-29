import { Platform, type ViewStyle } from 'react-native';

import { Colors } from './colors';

export const Theme = {
  radius: {
    sm: 10,
    md: 14,
    lg: 18,
    xl: 22,
    pill: 999,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    ...Platform.select<ViewStyle>({
      ios: {
        shadowColor: Colors.primary,
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.08,
        shadowRadius: 10,
      },
      android: {
        elevation: 2,
      },
      default: {},
    }),
  } satisfies ViewStyle,
  cardPadding: 16,
} as const;
