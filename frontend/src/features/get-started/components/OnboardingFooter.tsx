import Feather from "@expo/vector-icons/Feather";
import { Pressable, StyleSheet, Text, View } from "react-native";

import { colors, radius, spacing } from "@/theme/theme";

type Props = { onNext: () => void; onSelectPage: (index: number) => void; activeIndex: number; pageCount: number; label?: string };

export function OnboardingFooter({ onNext, onSelectPage, activeIndex, pageCount, label = "Next" }: Props) {
  return (
    <View style={styles.footer}>
      <View style={styles.pagination}>
        {Array.from({ length: pageCount }, (_, index) => (
          <Pressable key={index} onPress={() => onSelectPage(index)} accessibilityRole="button"
            accessibilityLabel={`Go to introduction ${index + 1} of ${pageCount}`}
            accessibilityState={{ selected: index === activeIndex }} style={styles.dotTarget}>
            <View style={[styles.dot, index === activeIndex && styles.activeDot]} />
          </Pressable>
        ))}
      </View>
      <Pressable onPress={onNext} accessibilityRole="button" accessibilityLabel={label} style={({ pressed }) => [styles.button, pressed && styles.pressed]}>
        <Text style={styles.buttonText}>{label}</Text>
        <Feather name="arrow-right" size={21} color={colors.textInverse} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[5],
    gap: spacing[1],
  },

  pagination: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },

  dotTarget: {
    minWidth: 32,
    minHeight: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  dot: {
    width: 10,
    height: 10,
    borderRadius: radius.full,
    backgroundColor: colors.border,
  },

  activeDot: {
    width: 25,
    backgroundColor: colors.primary,
  },

  button: {
    minHeight: 54,
    paddingVertical: spacing[4],
    paddingHorizontal: spacing[6],
    borderRadius: radius.lg,
    backgroundColor: colors.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: spacing[3],
    boxShadow: '0px 6px 18px rgba(13, 148, 136, 0.16)',
  },

  buttonText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    color: colors.textInverse,
  },

  pressed: {
    backgroundColor: colors.primaryStrong,
    transform: [
      {
        scale: 0.99,
      },
    ],
  },
});
