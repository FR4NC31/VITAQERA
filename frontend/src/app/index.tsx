import { StyleSheet, Text, View } from "react-native";
import { colors, fontSize, spacing } from "@/theme/theme";

export default function Index() {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>VitaQera</Text>
      <Text style={styles.body}>Nutrition for a brighter you.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.background,
    paddingHorizontal: spacing.screenHorizontal,
  },

  heading: {
    fontFamily: "Fraunces-Bold",
    fontSize: fontSize["4xl"],
    color: colors.textPrimary,
  },

  body: {
    marginTop: spacing[2],
    fontFamily: "Manrope-Regular",
    fontSize: fontSize.lg,
    color: colors.textSecondary,
  },
});