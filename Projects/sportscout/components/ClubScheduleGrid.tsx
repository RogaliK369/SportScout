import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { ConfirmModal } from '@/components/ConfirmModal';
import { Colors, Theme, type ClubPricing, type ScheduleDay, formatPrice } from '@/constants';
import { getPriceTierLabel, getSlotPrice, getSlotPriceLabel } from '@/lib/pricing';
import { useReservations } from '@/lib/reservations';
import {
  assessCancellation,
  buildCancellationMessage,
  CANCELLATION_POLICY_TEXT,
  parseSlotId,
} from '@/lib/slotUtils';

type ClubScheduleGridProps = {
  day: ScheduleDay;
  clubName: string;
  pricing: ClubPricing;
};

const TIME_COL_WIDTH = 58;
const RESOURCE_COL_WIDTH = 96;
const ROW_HEIGHT = 62;

type DialogState =
  | {
      kind: 'reserve';
      slotId: string;
      resource: string;
      time: string;
      dateLabel: string;
      dateKey: string;
      priceLabel: string;
    }
  | {
      kind: 'cancel';
      slotId: string;
      resource: string;
      time: string;
      dateLabel: string;
      dateKey: string;
      fineAmount: number;
      cancelMessage: string;
    }
  | {
      kind: 'success';
      title: string;
      message: string;
    }
  | null;

/**
 * Spreadsheet-style availability grid with confirm / cancel dialogs.
 */
export function ClubScheduleGrid({ day, clubName, pricing }: ClubScheduleGridProps) {
  const { getSlotStatus, reserveSlot, cancelSlot } = useReservations();
  const [dialog, setDialog] = useState<DialogState>(null);

  const closeDialog = () => setDialog(null);

  const handleConfirmReserve = () => {
    if (dialog?.kind !== 'reserve') {
      return;
    }

    reserveSlot(dialog.slotId);
    setDialog({
      kind: 'success',
      title: 'Reservation confirmed',
      message: `Your booking at ${clubName} is confirmed.\n\nPrice: ${dialog.priceLabel}\n\n${CANCELLATION_POLICY_TEXT}`,
    });
  };

  const handleConfirmCancel = () => {
    if (dialog?.kind !== 'cancel') {
      return;
    }

    cancelSlot(dialog.slotId);
    const fineNote =
      dialog.fineAmount > 0
        ? `\n\nA cancellation fee of ${formatPrice(dialog.fineAmount)} has been applied.`
        : '';
    setDialog({
      kind: 'success',
      title: dialog.fineAmount > 0 ? 'Cancelled with fee' : 'Reservation cancelled',
      message: `Your slot at ${clubName} has been released.${fineNote}`,
    });
  };

  return (
    <>
      <View style={styles.wrapper}>
        <View style={styles.policyBanner}>
          <Text style={styles.policyIcon}>ℹ️</Text>
          <Text style={styles.policyText}>{CANCELLATION_POLICY_TEXT}</Text>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <View style={styles.headerRow}>
              <View style={[styles.timeHeaderCell, styles.cornerCell]}>
                <Text style={styles.headerText}>Time</Text>
              </View>
              {day.resources.map((resource) => (
                <View key={resource} style={styles.resourceHeaderCell}>
                  <Text style={styles.headerText} numberOfLines={2}>
                    {resource}
                  </Text>
                </View>
              ))}
            </View>

            {day.rows.map((row) => (
              <View key={row.time} style={styles.bodyRow}>
                <View style={styles.timeCell}>
                  <Text style={styles.timeText}>{row.time}</Text>
                </View>
                {row.cells.map((cell, index) => {
                  const status = getSlotStatus(cell.slotId, cell.status);
                  const resource = day.resources[index];

                  return (
                    <ScheduleCell
                      key={cell.slotId}
                      resource={resource}
                      time={row.time}
                      status={status}
                      priceLabel={getSlotPriceLabel(pricing, row.time, resource, day.dateKey)}
                      onReserve={() =>
                        setDialog({
                          kind: 'reserve',
                          slotId: cell.slotId,
                          resource,
                          time: row.time,
                          dateLabel: day.label,
                          dateKey: day.dateKey,
                          priceLabel: getSlotPriceLabel(pricing, row.time, resource, day.dateKey),
                        })
                      }
                      onCancel={() => {
                        const parsed = parseSlotId(cell.slotId);
                        const dateKey = parsed?.dateKey ?? day.dateKey;
                        const slotPrice = getSlotPrice(pricing, row.time, resource, dateKey);
                        const assessment = assessCancellation(dateKey, row.time, slotPrice);
                        setDialog({
                          kind: 'cancel',
                          slotId: cell.slotId,
                          resource,
                          time: row.time,
                          dateLabel: day.label,
                          dateKey,
                          fineAmount: assessment.fineAmount,
                          cancelMessage: buildCancellationMessage(assessment, resource, clubName),
                        });
                      }}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>

        <View style={styles.legend}>
          <LegendDot color={Colors.primary} label="Available — tap Reserve" />
          <LegendDot color={Colors.muted} label="Taken" />
          <LegendDot color={Colors.primaryDark} label="Your booking — tap to cancel" />
        </View>
      </View>

      <ConfirmModal
        visible={dialog?.kind === 'reserve'}
        title="Confirm reservation"
        message={
          dialog?.kind === 'reserve'
            ? (() => {
                const tier = getPriceTierLabel(pricing, dialog.time, dialog.dateKey);
                return `Book ${dialog.resource} at ${dialog.time} (${dialog.dateLabel}) at ${clubName}?\n\nPrice (${tier}): ${dialog.priceLabel}\n\n${CANCELLATION_POLICY_TEXT}`;
              })()
            : ''
        }
        confirmLabel="Confirm booking"
        cancelLabel="Not now"
        onConfirm={handleConfirmReserve}
        onCancel={closeDialog}
      />

      <ConfirmModal
        visible={dialog?.kind === 'cancel'}
        title={dialog?.kind === 'cancel' && dialog.fineAmount > 0 ? 'Cancellation fee applies' : 'Cancel reservation'}
        message={dialog?.kind === 'cancel' ? dialog.cancelMessage : ''}
        confirmLabel={
          dialog?.kind === 'cancel' && dialog.fineAmount > 0
            ? `Pay ${formatPrice(dialog.fineAmount)} & cancel`
            : 'Cancel booking'
        }
        cancelLabel="Keep booking"
        variant={dialog?.kind === 'cancel' && dialog.fineAmount > 0 ? 'fine' : 'default'}
        fineAmount={dialog?.kind === 'cancel' ? dialog.fineAmount : undefined}
        onConfirm={handleConfirmCancel}
        onCancel={closeDialog}
      />

      <ConfirmModal
        visible={dialog?.kind === 'success'}
        title={dialog?.kind === 'success' ? dialog.title : ''}
        message={dialog?.kind === 'success' ? dialog.message : ''}
        confirmLabel="OK"
        variant="success"
        showCancel={false}
        onConfirm={closeDialog}
        onCancel={closeDialog}
      />
    </>
  );
}

type ScheduleCellProps = {
  resource: string;
  time: string;
  status: 'available' | 'reserved' | 'mine';
  priceLabel: string;
  onReserve: () => void;
  onCancel: () => void;
};

function ScheduleCell({ resource, time, status, priceLabel, onReserve, onCancel }: ScheduleCellProps) {
  if (status === 'available') {
    return (
      <View style={styles.cell}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Reserve ${resource} at ${time} for ${priceLabel}`}
          onPress={onReserve}
          style={({ pressed }) => [styles.reserveButton, pressed && styles.reservePressed]}>
          <Text style={styles.reserveText}>Reserve</Text>
          <Text style={styles.priceText}>{priceLabel.replace('/ hod', '').replace('/ lekce', '')}</Text>
        </Pressable>
      </View>
    );
  }

  if (status === 'mine') {
    return (
      <View style={styles.cell}>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Cancel ${resource} at ${time}`}
          onPress={onCancel}
          style={({ pressed }) => [styles.mineCell, styles.minePressable, pressed && styles.reservePressed]}>
          <Text style={styles.mineText}>Yours</Text>
          <Text style={styles.cancelHint}>Cancel</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.cell}>
      <View style={styles.takenCell}>
        <Text style={styles.takenText}>Taken</Text>
      </View>
    </View>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <View style={styles.legendItem}>
      <View style={[styles.legendDot, { backgroundColor: color }]} />
      <Text style={styles.legendLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    ...Theme.card,
    padding: 12,
    overflow: 'hidden',
  },
  policyBanner: {
    flexDirection: 'row',
    backgroundColor: Colors.primarySoft,
    borderRadius: Theme.radius.md,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.borderLight,
  },
  policyIcon: {
    fontSize: 16,
    marginRight: 8,
    marginTop: 1,
  },
  policyText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 18,
    color: Colors.primaryDark,
    fontWeight: '500',
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderBottomColor: Colors.primaryMuted,
  },
  bodyRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: Colors.borderLight,
  },
  cornerCell: {
    backgroundColor: Colors.primarySoft,
  },
  timeHeaderCell: {
    width: TIME_COL_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 6,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
  },
  resourceHeaderCell: {
    width: RESOURCE_COL_WIDTH,
    paddingVertical: 10,
    paddingHorizontal: 6,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primaryLight,
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
  },
  headerText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.primaryDark,
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 0.3,
  },
  timeCell: {
    width: TIME_COL_WIDTH,
    height: ROW_HEIGHT,
    justifyContent: 'center',
    paddingHorizontal: 6,
    backgroundColor: Colors.primarySoft,
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
  },
  timeText: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.text,
  },
  cell: {
    width: RESOURCE_COL_WIDTH,
    height: ROW_HEIGHT,
    padding: 4,
    borderRightWidth: 1,
    borderRightColor: Colors.borderLight,
    justifyContent: 'center',
  },
  reserveButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  reservePressed: {
    opacity: 0.85,
  },
  reserveText: {
    color: Colors.white,
    fontSize: 10,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  priceText: {
    color: Colors.primaryLight,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
  },
  takenCell: {
    flex: 1,
    backgroundColor: '#E8ECF0',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  mineCell: {
    flex: 1,
    backgroundColor: Colors.primaryMuted,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  minePressable: {
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  takenText: {
    color: Colors.muted,
    fontSize: 11,
    fontWeight: '700',
  },
  mineText: {
    color: Colors.primaryDark,
    fontSize: 11,
    fontWeight: '800',
  },
  cancelHint: {
    color: Colors.primary,
    fontSize: 9,
    fontWeight: '700',
    marginTop: 1,
  },
  legend: {
    marginTop: 12,
    gap: 6,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 8,
  },
  legendLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
  },
});
