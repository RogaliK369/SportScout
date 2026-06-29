import { StyleSheet, Text, type TextProps } from 'react-native';

import { Colors } from '@/constants';

type SectionLabelProps = TextProps & {
  children: string;
};

/** Uppercase green-tinted section heading for filters and form groups. */
export function SectionLabel({ children, style, ...props }: SectionLabelProps) {
  return (
    <Text style={[styles.label, style]} {...props}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.primaryDark,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 10,
  },
});
