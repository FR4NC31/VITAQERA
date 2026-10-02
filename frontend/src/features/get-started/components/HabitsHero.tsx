import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { HabitCalendarCard, SmallStepsBadge, StreakCard, TodayHabitsCard } from "./HabitsCards";

const CANVAS_WIDTH = 390;
const CANVAS_HEIGHT = 362;

export function HabitsHero({ height }: { height: number }) {
  const [width, setWidth] = useState(CANVAS_WIDTH);
  const scale = Math.min(width / CANVAS_WIDTH, height / CANVAS_HEIGHT);

  return (
    <View
      style={[styles.hero, {
        height,
      }]}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      accessible
      accessibilityLabel="Build healthy habits with nourishing meals, movement, and hydration. Example: a 7 day streak, four completed days, and today's healthy meal, movement, and hydration checked off. Take a moment is still to do. Small steps, big results."
    >
      {/* Keep the photo and illustrative cards in proportion at every screen size. */}
      <View style={[styles.canvas, {
        left: (width - CANVAS_WIDTH) / 2,
        top: (height - CANVAS_HEIGHT) / 2,
        transform: [
          {
            scale,
          },
        ],
      }]} accessibilityElementsHidden importantForAccessibility="no-hide-descendants">
        <Image source={require("@/assets/images/GetStarted/sage-wave.png")} style={styles.backdrop} contentFit="fill" />
        <Image source={require("@/assets/images/GetStarted/leaves-left.png")} style={styles.leavesLeft} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/leaves-right.png")} style={styles.leavesRight} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/yoga-breakfast.png")} style={styles.breakfast} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/mint-wave.png")} style={styles.frontWave} contentFit="fill" />
        <Image source={require("@/assets/images/GetStarted/teal-accent.png")} style={styles.accent} contentFit="contain" />
        <View style={styles.streakPosition}><StreakCard /></View>
        <View style={styles.todayPosition}><TodayHabitsCard /></View>
        <View style={styles.calendarPosition}><HabitCalendarCard /></View>
        <View style={styles.badgePosition}><SmallStepsBadge /></View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    overflow: 'hidden',
  },

  canvas: {
    position: 'absolute',
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
    pointerEvents: 'none',
  },

  backdrop: {
    position: 'absolute',
    left: -15,
    top: -20,
    width: 420,
    height: 330,
  },

  leavesLeft: {
    position: 'absolute',
    left: -26,
    top: 105,
    width: 95,
    height: 120,
  },

  leavesRight: {
    position: 'absolute',
    right: -15,
    top: 171,
    width: 112,
    height: 100,
  },

  breakfast: {
    position: 'absolute',
    left: -35,
    top: 85,
    width: 445,
    height: 286,
  },

  frontWave: {
    position: 'absolute',
    left: -10,
    bottom: -2,
    width: 410,
    height: 57,
  },

  accent: {
    position: 'absolute',
    left: 214,
    top: 0,
    width: 30,
    height: 29,
  },

  streakPosition: {
    position: 'absolute',
    left: 38,
    top: 13,
  },

  todayPosition: {
    position: 'absolute',
    right: 19,
    top: 34,
  },

  calendarPosition: {
    position: 'absolute',
    left: 29,
    top: 139,
  },

  badgePosition: {
    position: 'absolute',
    left: 25,
    top: 287,
  },
});
