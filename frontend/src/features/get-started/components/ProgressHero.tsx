import { Image } from "expo-image";
import { useState } from "react";
import { StyleSheet, View } from "react-native";

import { DailyGoalCard, ProgressBadge, WeeklyActivityCard } from "./ProgressCards";

const CANVAS_SIZE = 390;

export function ProgressHero({ height }: { height: number }) {
  const [width, setWidth] = useState(CANVAS_SIZE);
  const scale = Math.min(width / CANVAS_SIZE, height / CANVAS_SIZE);

  return (
    <View
      style={[styles.hero, {
        height,
      }]}
      onLayout={(event) => setWidth(event.nativeEvent.layout.width)}
      accessible
      accessibilityLabel="Example progress dashboard: 78 percent of daily goal, 1,620 calories, 120 grams protein, 180 grams carbs, 60 grams fats. On track 5 of 7 days, 8,240 steps. Building healthier habits."
    >
      {/* Scale the complete illustration together so cards never overlap on small screens. */}
      <View style={[styles.canvas, {
        left: (width - CANVAS_SIZE) / 2,
        top: (height - CANVAS_SIZE) / 2,
        transform: [
          {
            scale,
          },
        ],
      }]}>
        <View style={styles.leftBackdrop} />
        <View style={styles.rightBackdrop} />
        <Image source={require("@/assets/images/GetStarted/sage-wave.png")} style={styles.backdropWave} contentFit="fill" />
        <Image source={require("@/assets/images/GetStarted/leaves-left.png")} style={styles.leavesLeft} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/leaves-right.png")} style={styles.leavesRight} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/fitness-breakfast.png")} style={styles.breakfast} contentFit="contain" />
        <Image source={require("@/assets/images/GetStarted/progress-wave.png")} style={styles.frontWave} contentFit="fill" />
        <Image source={require("@/assets/images/GetStarted/teal-accent.png")} style={styles.accent} contentFit="contain" />
        <View style={styles.dailyPosition}><DailyGoalCard /></View>
        <View style={styles.activityPosition}><WeeklyActivityCard /></View>
        <View style={styles.stepsPosition}><ProgressBadge variant="steps" /></View>
        <View style={styles.habitsPosition}><ProgressBadge variant="habits" /></View>
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
    width: CANVAS_SIZE,
    height: CANVAS_SIZE,
  },

  leftBackdrop: {
    position: 'absolute',
    left: -100,
    top: 75,
    width: 335,
    height: 225,
    borderRadius: 80,
    backgroundColor: '#E4F0E9',
    transform: [
      {
        rotate: '-33deg',
      },
    ],
  },

  rightBackdrop: {
    position: 'absolute',
    right: -115,
    top: 10,
    width: 275,
    height: 310,
    borderRadius: 125,
    backgroundColor: '#EAF3EE',
    transform: [
      {
        rotate: '30deg',
      },
    ],
  },

  backdropWave: {
    position: 'absolute',
    left: 0,
    top: 50,
    width: 390,
    height: 280,
    opacity: 0.65,
  },

  leavesLeft: {
    position: 'absolute',
    left: -28,
    top: 140,
    width: 90,
    height: 130,
    opacity: 0.8,
  },

  leavesRight: {
    position: 'absolute',
    right: -28,
    top: 145,
    width: 90,
    height: 130,
    opacity: 0.8,
  },

  breakfast: {
    position: 'absolute',
    left: -12,
    top: 130,
    width: 414,
    height: 265,
  },

  frontWave: {
    position: 'absolute',
    left: -10,
    bottom: -26,
    width: 410,
    height: 110,
  },

  accent: {
    position: 'absolute',
    left: 237,
    top: 0,
    width: 28,
    height: 30,
  },

  dailyPosition: {
    position: 'absolute',
    left: 30,
    top: 13,
  },

  activityPosition: {
    position: 'absolute',
    right: 18,
    top: 75,
  },

  stepsPosition: {
    position: 'absolute',
    left: 27,
    top: 180,
  },

  habitsPosition: {
    position: 'absolute',
    right: 23,
    top: 184,
  },
});
