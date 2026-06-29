import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Colors, Theme, type ScheduleDay } from '@/constants';
import { getScheduleDateParts } from '@/constants/dates';
import { formatDatePickerOption } from '@/constants/scheduleBuilder';

type ScheduleDatePickerProps = {
  days: ScheduleDay[];
  selectedIndex: number;
  onSelect: (index: number) => void;
};

/**
 * Horizontal date bar + dropdown list for picking a schedule day.
 */
export function ScheduleDatePicker({ days, selectedIndex, onSelect }: ScheduleDatePickerProps) {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const selectedDay = days[selectedIndex];

  return (
    <View style={styles.wrapper}>
      <Pressable
        style={styles.dropdownTrigger}
        onPress={() => setDropdownOpen(true)}
        accessibilityRole="button"
        accessibilityLabel="Open date list">
        <View style={styles.dropdownTriggerText}>
          <Text style={styles.dropdownLabel}>Selected date</Text>
          <Text style={styles.dropdownValue}>
            {selectedDay ? formatDatePickerOption(selectedDay.dateKey) : 'Pick a day'}
          </Text>
        </View>
        <Ionicons name="chevron-down" size={20} color={Colors.primary} />
      </Pressable>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.dateBar}>
        {days.map((day, index) => {
          const active = index === selectedIndex;
          const parts = getScheduleDateParts(day.dateKey);

          return (
            <Pressable
              key={day.dateKey}
              onPress={() => onSelect(index)}
              style={[styles.dateChip, active && styles.dateChipActive]}
              accessibilityRole="button"
              accessibilityState={{ selected: active }}>
              <Text style={[styles.chipWeekday, active && styles.chipTextActive]}>{parts.weekday}</Text>
              <Text style={[styles.chipDayNum, active && styles.chipTextActive]}>{parts.dayNum}</Text>
              <Text style={[styles.chipMonth, active && styles.chipSubActive]}>{parts.month}</Text>
            </Pressable>
          );
        })}
      </ScrollView>

      <Modal visible={dropdownOpen} transparent animationType="fade" onRequestClose={() => setDropdownOpen(false)}>
        <Pressable style={styles.modalBackdrop} onPress={() => setDropdownOpen(false)}>
          <Pressable style={styles.modalCard} onPress={(event) => event.stopPropagation()}>
            <Text style={styles.modalTitle}>Choose a date</Text>
            <Text style={styles.modalSubtitle}>{days.length} days available</Text>

            <ScrollView style={styles.modalList} showsVerticalScrollIndicator={false}>
              {days.map((day, index) => {
                const active = index === selectedIndex;
                return (
                  <Pressable
                    key={day.dateKey}
                    onPress={() => {
                      onSelect(index);
                      setDropdownOpen(false);
                    }}
                    style={[styles.modalRow, active && styles.modalRowActive]}>
                    <Text style={[styles.modalRowText, active && styles.modalRowTextActive]}>
                      {formatDatePickerOption(day.dateKey)}
                    </Text>
                    {active ? <Ionicons name="checkmark-circle" size={20} color={Colors.primary} /> : null}
                  </Pressable>
                );
              })}
            </ScrollView>

            <Pressable style={styles.modalClose} onPress={() => setDropdownOpen(false)}>
              <Text style={styles.modalCloseText}>Close</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 12,
  },
  dropdownTrigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: Theme.radius.md,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
  },
  dropdownTriggerText: {
    flex: 1,
    paddingRight: 8,
  },
  dropdownLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  dropdownValue: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.primaryDark,
    lineHeight: 20,
  },
  dateBar: {
    paddingVertical: 4,
  },
  dateChip: {
    width: 64,
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: Theme.radius.md,
    borderWidth: 1,
    borderColor: Colors.borderLight,
    backgroundColor: Colors.surface,
    marginRight: 8,
  },
  dateChipActive: {
    borderColor: Colors.primary,
    backgroundColor: Colors.primaryLight,
  },
  chipWeekday: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.textSecondary,
    textTransform: 'uppercase',
  },
  chipDayNum: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginVertical: 2,
  },
  chipMonth: {
    fontSize: 10,
    fontWeight: '600',
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: Colors.primaryDark,
  },
  chipSubActive: {
    color: Colors.primary,
  },
  modalBackdrop: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.45)',
    justifyContent: 'flex-end',
  },
  modalCard: {
    backgroundColor: Colors.surface,
    borderTopLeftRadius: Theme.radius.xl,
    borderTopRightRadius: Theme.radius.xl,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 28,
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: Colors.text,
    marginBottom: 4,
  },
  modalSubtitle: {
    fontSize: 14,
    color: Colors.textSecondary,
    marginBottom: 16,
  },
  modalList: {
    maxHeight: 360,
  },
  modalRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 12,
    borderRadius: Theme.radius.md,
    marginBottom: 4,
  },
  modalRowActive: {
    backgroundColor: Colors.primaryLight,
  },
  modalRowText: {
    fontSize: 15,
    color: Colors.text,
    flex: 1,
    paddingRight: 8,
  },
  modalRowTextActive: {
    fontWeight: '700',
    color: Colors.primaryDark,
  },
  modalClose: {
    marginTop: 12,
    alignItems: 'center',
    paddingVertical: 12,
  },
  modalCloseText: {
    fontSize: 16,
    fontWeight: '700',
    color: Colors.primary,
  },
});
