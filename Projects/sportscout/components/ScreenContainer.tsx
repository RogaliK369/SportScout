import { SafeAreaView, StyleSheet, type ViewProps } from 'react-native';

import { Colors } from '@/constants/colors';

type ScreenContainerProps = ViewProps & {
  children: React.ReactNode;
};

/**
 * Wrapper that gives every screen the same background and safe area padding.
 */
export function ScreenContainer({ children, style, ...props }: ScreenContainerProps) {
  return (
    <SafeAreaView style={[styles.container, style]} {...props}>
      {children}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
});
