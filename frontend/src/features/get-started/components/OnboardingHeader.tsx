import { Image } from "expo-image";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/theme/theme";

type Props = { onSkip: () => void; showSkip?: boolean };

export function OnboardingHeader({ onSkip, showSkip = true }: Props) {
  return (
    <View style={styles.header}>
      <View style={styles.brand} accessible accessibilityLabel="VitaQera">
        <Image source={require("@/assets/images/Icons/VQ_AppIcon.png")} style={styles.logo} contentFit="contain" />
        <Text style={styles.name}>VitaQera</Text>
      </View>
      {showSkip && (
        <Pressable accessibilityRole="button" accessibilityLabel="Skip introduction" onPress={onSkip}
          style={({ pressed }) => [styles.skipTarget, pressed && styles.pressed]}>
          <View style={styles.skipPill}><Text style={styles.skipText}>Skip</Text></View>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.screenHorizontal,
    paddingVertical: spacing[2],
    minHeight: 64,
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[1],
  },

  logo: {
    width: 44,
    height: 44,
  },

  name: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 21,
    color: colors.textPrimary,
  },

  skipTarget: {
    minHeight: 44,
    justifyContent: 'center',
  },

  skipPill: {
    paddingHorizontal: spacing[5],
    paddingVertical: spacing[2],
    borderRadius: radius.full,
    backgroundColor: colors.surfaceTertiary,
  },

  skipText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 13,
    color: colors.textSecondary,
  },

  pressed: {
    opacity: 0.65,
  },
});
