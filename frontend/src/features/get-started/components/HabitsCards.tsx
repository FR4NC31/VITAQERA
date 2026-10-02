import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

import { colors } from "@/theme/theme";

const habits = [
  { icon: "food-apple", label: "Healthy meal", complete: true },
  { icon: "dumbbell", label: "Move your body", complete: true },
  { icon: "water", label: "Stay hydrated", complete: true },
  { icon: "flower-tulip", label: "Take a moment", complete: false },
] as const;

export function StreakCard() {
  return (
    <View style={[styles.card, styles.streakCard]}>
      <View style={styles.ring}>
        <View style={styles.ringTrack} />
        <View style={styles.fireTile}>
          <MaterialCommunityIcons name="fire" size={19} color={colors.primary} />
        </View>
        <Text maxFontSizeMultiplier={1} style={styles.streakValue}>7</Text>
        <Text maxFontSizeMultiplier={1} style={styles.streakLabel}>Day Streak</Text>
      </View>
      <View style={styles.streakCopy}>
        <MaterialCommunityIcons name="sprout" size={25} color="#66AF32" />
        <Text maxFontSizeMultiplier={1} style={styles.encouragement}>{"You’re\nbuilding\nhealthy habits!"}</Text>
      </View>
    </View>
  );
}

export function TodayHabitsCard() {
  return (
    <View style={[styles.card, styles.todayCard]}>
      <Text maxFontSizeMultiplier={1} style={styles.todayTitle}>Today</Text>
      {habits.map((habit, index) => (
        <View key={habit.label} style={styles.habitRow}>
          <View style={styles.habitIcon}>
            <MaterialCommunityIcons name={habit.icon} size={17} color="#069974" />
          </View>
          <View style={[styles.habitDetails, index < habits.length - 1 && styles.rowDivider]}>
            <Text maxFontSizeMultiplier={1} style={styles.habitLabel}>{habit.label}</Text>
            <View style={[styles.check, !habit.complete && styles.unchecked]}>
              {habit.complete && <MaterialCommunityIcons name="check" size={10} color={colors.textInverse} />}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
}

export function HabitCalendarCard() {
  return (
    <View style={[styles.card, styles.calendarCard]}>
      {["M", "T", "W", "T", "F", "S", "S"].map((day, index) => (
        <View key={index} style={styles.calendarColumn}>
          <Text maxFontSizeMultiplier={1} style={styles.day}>{day}</Text>
          <View style={[styles.calendarDot, index < 4 && styles.completedDay]}>
            {index < 4 && <MaterialCommunityIcons name="check" size={10} color={colors.textInverse} />}
          </View>
          <View style={styles.calendarDot} />
        </View>
      ))}
    </View>
  );
}

export function SmallStepsBadge() {
  return (
    <View style={[styles.card, styles.badge]}>
      <View style={styles.peopleTile}>
        <MaterialCommunityIcons name="account-group" size={24} color="#42B59A" />
      </View>
      <Text maxFontSizeMultiplier={1} style={styles.badgeLabel}>{"Small steps\nbig results"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    boxShadow: '0px 8px 24px rgba(36, 76, 52, 0.07)',
  },

  streakCard: {
    width: 176,
    height: 98,
    borderRadius: 23,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    gap: 8,
  },

  ring: {
    width: 77,
    height: 77,
    alignItems: 'center',
    justifyContent: 'center',
  },

  ringTrack: {
    ...StyleSheet.absoluteFill,
    borderRadius: 40,
    borderWidth: 6,
    borderColor: '#DAEDE6',
    borderTopColor: '#1DA48D',
    borderRightColor: '#2DAD8C',
    borderBottomColor: '#39B393',
    transform: [
      {
        rotate: '-42deg',
      },
    ],
  },

  fireTile: {
    width: 23,
    height: 23,
    borderRadius: 12,
    backgroundColor: '#EDFBF5',
    alignItems: 'center',
    justifyContent: 'center',
  },

  streakValue: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#101821',
  },

  streakLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 8,
    lineHeight: 11,
    color: '#505566',
  },

  streakCopy: {
    flex: 1,
    height: 75,
    borderLeftWidth: 1,
    borderLeftColor: colors.borderSubtle,
    paddingLeft: 11,
    justifyContent: 'center',
    gap: 4,
  },

  encouragement: {
    fontFamily: 'Manrope-Regular',
    fontSize: 9,
    lineHeight: 12,
    color: '#41485A',
  },

  todayCard: {
    width: 124,
    padding: 10,
    borderRadius: 17,
  },

  todayTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    lineHeight: 13,
    marginBottom: 3,
    color: '#111827',
  },

  habitRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  habitIcon: {
    width: 22,
    height: 21,
    borderRadius: 8,
    backgroundColor: '#ECFAF4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  habitDetails: {
    flex: 1,
    minHeight: 26,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 3,
  },

  rowDivider: {
    borderBottomWidth: 0.5,
    borderBottomColor: colors.borderSubtle,
  },

  habitLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 7.3,
    color: '#41485A',
  },

  check: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#16A05C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  unchecked: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#D1DBD8',
  },

  calendarCard: {
    width: 127,
    height: 65,
    borderRadius: 13,
    paddingHorizontal: 10,
    paddingVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  calendarColumn: {
    alignItems: 'center',
    gap: 6,
  },

  day: {
    fontFamily: 'Manrope-Medium',
    fontSize: 7,
    lineHeight: 10,
    color: '#505566',
  },

  calendarDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#E6EFEB',
    alignItems: 'center',
    justifyContent: 'center',
  },

  completedDay: {
    backgroundColor: '#0AA05B',
  },

  badge: {
    width: 107,
    height: 45,
    borderRadius: 15,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  peopleTile: {
    width: 31,
    height: 31,
    borderRadius: 10,
    backgroundColor: '#E7F8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },

  badgeLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 9,
    lineHeight: 12,
    color: '#202A3D',
  },
});
