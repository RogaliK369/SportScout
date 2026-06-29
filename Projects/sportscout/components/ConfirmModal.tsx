import { Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { Button } from '@/components/Button';
import { Colors, Theme, formatPrice } from '@/constants';

type ConfirmModalProps = {
  visible: boolean;
  title: string;
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  variant?: 'default' | 'warning' | 'success' | 'fine';
  showCancel?: boolean;
  /** Shown prominently when a cancellation fee applies. */
  fineAmount?: number;
};

/**
 * Centered confirmation / alert dialog.
 */
export function ConfirmModal({
  visible,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Go back',
  onConfirm,
  onCancel,
  variant = 'default',
  showCancel = true,
  fineAmount,
}: ConfirmModalProps) {
  const showFine = fineAmount !== undefined && fineAmount > 0;

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={onCancel}>
      <Pressable style={styles.backdrop} onPress={onCancel}>
        <Pressable style={styles.card} onPress={(event) => event.stopPropagation()}>
          <View
            style={[
              styles.iconCircle,
              variant === 'warning' && styles.iconWarning,
              variant === 'fine' && styles.iconFine,
              variant === 'success' && styles.iconSuccess,
            ]}>
            <Text style={styles.icon}>
              {variant === 'success' ? '✓' : variant === 'fine' ? '⚠' : variant === 'warning' ? '!' : '?'}
            </Text>
          </View>

          <Text style={styles.title}>{title}</Text>

          {showFine ? (
            <View style={styles.fineBox}>
              <Text style={styles.fineLabel}>Cancellation fee</Text>
              <Text style={styles.fineAmount}>{formatPrice(fineAmount)}</Text>
              <Text style={styles.fineNote}>Less than 24 hours before your slot</Text>
            </View>
          ) : null}

          <Text style={styles.message}>{message}</Text>

          <Button
            title={confirmLabel}
            onPress={onConfirm}
            style={variant === 'fine' ? styles.fineConfirmButton : undefined}
          />
          {showCancel ? (
            <>
              <View style={styles.gap} />
              <Button title={cancelLabel} variant="secondary" onPress={onCancel} />
            </>
          ) : null}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  card: {
    ...Theme.card,
    padding: 22,
    borderRadius: Theme.radius.xl,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: Colors.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 14,
  },
  iconWarning: {
    backgroundColor: '#FFF3E0',
  },
  iconFine: {
    backgroundColor: '#FFEBEE',
  },
  iconSuccess: {
    backgroundColor: Colors.primaryMuted,
  },
  icon: {
    fontSize: 22,
    fontWeight: '800',
    color: Colors.primaryDark,
  },
  fineBox: {
    backgroundColor: '#FFEBEE',
    borderWidth: 1,
    borderColor: '#FFCDD2',
    borderRadius: Theme.radius.md,
    padding: 14,
    marginBottom: 14,
    alignItems: 'center',
  },
  fineLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#B71C1C',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  fineAmount: {
    fontSize: 28,
    fontWeight: '800',
    color: '#C62828',
    marginTop: 4,
  },
  fineNote: {
    fontSize: 12,
    color: '#B71C1C',
    marginTop: 4,
    textAlign: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    textAlign: 'center',
    marginBottom: 10,
  },
  message: {
    fontSize: 15,
    lineHeight: 22,
    color: Colors.textSecondary,
    textAlign: 'center',
    marginBottom: 20,
  },
  fineConfirmButton: {
    backgroundColor: '#C62828',
  },
  gap: {
    height: 10,
  },
});
