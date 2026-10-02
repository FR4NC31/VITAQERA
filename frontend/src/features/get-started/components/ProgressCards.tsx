import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/theme/theme";

const dailyMetrics = [
  { icon: "fire", value: "1,620", label: "Calories", color: "#FF8B55" },
  { icon: "leaf", value: "120g", label: "Protein", color: "#7AC85D" },
  { icon: "barley", value: "180g", label: "Carbs", color: "#FFBB23" },
  { icon: "water", value: "60g", label: "Fats", color: "#39B99C" },
] as const;

export function DailyGoalCard() {
  return (
    <View style={styles.dailyCard}>
      <View style={styles.ring}>
        <Text style={styles.percentage}>78%</Text>
        <Text style={styles.goalLabel}>Daily Goal</Text>
      </View>
      <View style={styles.metrics}>
        {dailyMetrics.map((metric) => (
          <View key={metric.label} style={styles.metric}>
            <MaterialCommunityIcons name={metric.icon} size={18} color={metric.color} />
            <View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricLabel}>{metric.label}</Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

export function WeeklyActivityCard() {
  return (
    <View style={styles.activityCard}>
      <View style={styles.activityHeading}>
        <View style={styles.iconTile}>
          <MaterialCommunityIcons name="chart-bar" size={24} color={colors.primary} />
        </View>
        <View>
          <Text style={styles.activityTitle}>On Track</Text>
          <Text style={styles.metricLabel}>5 of 7 days</Text>
        </View>
      </View>
      <View style={styles.chart}>
        {[17, 23, 17, 23, 17, 23, 23].map((height, index) => (
          <View key={index} style={[styles.bar, {
            height,
          }, index > 4 && styles.inactiveBar]} />
        ))}
      </View>
    </View>
  );
}

type ProgressBadgeProps = {
  variant: "steps" | "habits";
};

export function ProgressBadge({ variant }: ProgressBadgeProps) {
  const isSteps = variant === "steps";
  return (
    <View style={styles.badge}>
      <View style={styles.iconTile}>
        <MaterialCommunityIcons name={isSteps ? "shoe-sneaker" : "bullseye-arrow"} size={25} color={colors.primaryStrong} />
      </View>
      <View>
        {isSteps ? (
          <>
            <Text style={styles.stepsValue}>8,240</Text>
            <Text style={styles.badgeLabel}>Steps</Text>
          </>
        ) : <Text style={styles.badgeLabel}>{"Building\nhealthier habits"}</Text>}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  dailyCard: {
    width: 196,
    minHeight: 120,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    gap: 12,
    borderRadius: 23,
    backgroundColor: colors.surface,
    boxShadow: '0px 10px 30px rgba(36, 76, 52, 0.07)',
  },

  ring: {
    width: 82,
    height: 82,
    borderRadius: radius.full,
    borderWidth: 7,
    borderColor: colors.surfaceSecondary,
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
    borderBottomColor: '#39B99C',
    alignItems: 'center',
    justifyContent: 'center',
  },

  percentage: {
    fontFamily: 'Manrope-Bold',
    fontSize: 24,
    color: colors.textPrimary,
  },

  goalLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 9,
    color: colors.textSecondary,
  },

  metrics: {
    borderLeftWidth: 1,
    borderLeftColor: colors.borderSubtle,
    paddingLeft: 12,
    gap: 5,
  },

  metric: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },

  metricValue: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    color: colors.textPrimary,
  },

  metricLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 8,
    color: colors.textSecondary,
  },

  activityCard: {
    width: 118,
    padding: 10,
    gap: 8,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    boxShadow: '0px 8px 24px rgba(36, 76, 52, 0.06)',
  },

  activityHeading: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },

  activityTitle: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 10,
    color: colors.textPrimary,
  },

  iconTile: {
    width: 32,
    height: 32,
    backgroundColor: colors.surfaceSecondary,
    borderRadius: radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },

  chart: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 23,
  },

  bar: {
    width: 9,
    borderRadius: radius.full,
    backgroundColor: colors.primary,
  },

  inactiveBar: {
    backgroundColor: colors.borderSubtle,
  },

  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 8,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    boxShadow: '0px 6px 18px rgba(36, 76, 52, 0.07)',
  },

  stepsValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 13,
    color: colors.textPrimary,
  },

  badgeLabel: {
    fontFamily: 'Manrope-Regular',
    fontSize: 10,
    lineHeight: 14,
    color: colors.textPrimary,
  },
});
