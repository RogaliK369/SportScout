import { StyleSheet, Text, TextInput, View, type TextInputProps } from 'react-native';

import { Colors } from '@/constants';

type TextFieldProps = TextInputProps & {
  label: string;
  hint?: string;
};

/** Styled text input matching the login screen fields. */
export function TextField({ label, hint, style, ...props }: TextFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>
      {hint ? <Text style={styles.hint}>{hint}</Text> : null}
      <TextInput
        placeholderTextColor={Colors.muted}
        style={[styles.input, style]}
        {...props}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: 8,
  },
  hint: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 8,
  },
  input: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: Colors.text,
  },
});
