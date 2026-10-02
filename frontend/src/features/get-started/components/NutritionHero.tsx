import Ionicons from "@expo/vector-icons/Ionicons";
import { Image } from "expo-image";
import { StyleSheet, Text, View } from "react-native";

import { colors, radius } from "@/theme/theme";

const nutrients = [
  { label: "Protein", value: "35g", color: "#F18D61" },
  { label: "Carbs", value: "45g", color: "#E4BD56" },
  { label: "Fats", value: "18g", color: "#ACCC72" },
];

function NutritionCard() {
  return (
    <View style={styles.nutritionCard}>
      <View style={styles.calorieRing}>
        <Text style={styles.calories}>520</Text>
        <Text style={styles.calorieUnit}>kcal</Text>
      </View>
      <View style={styles.nutrients}>
        {nutrients.map((nutrient) => (
          <View key={nutrient.label} style={styles.nutrientRow}>
            <View style={[styles.nutrientDot, {
              backgroundColor: nutrient.color,
            }]} />
            <Text style={styles.nutrientLabel}>{nutrient.label}</Text>
            <Text style={styles.nutrientValue}>{nutrient.value}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}

type BenefitProps = { label: string; icon: "leaf" | "bar-chart"; warm?: boolean };

function BenefitCard({ label, icon, warm = false }: BenefitProps) {
  return (
    <View style={styles.benefitCard}>
      <View style={[styles.benefitIcon, warm && styles.warmIcon]}>
        <Ionicons name={icon} size={19} color={warm ? "#E8A64D" : colors.primary} />
      </View>
      <Text style={styles.benefitText}>{label}</Text>
    </View>
  );
}

export function NutritionHero({ height }: { height: number }) {
  return (
    <View style={[styles.hero, {
      height,
    }]} accessible
      accessibilityLabel="A bowl of grilled chicken, avocado, vegetables and grains. Example meal: 520 calories, 35 grams protein, 45 grams carbs and 18 grams fat. Balanced nutrition. Better choices.">
      <View style={styles.backdropLeft} />
      <View style={styles.backdropRight} />
      <Image source={require("@/assets/images/GetStarted/leaves-left.png")} style={styles.leavesLeft} contentFit="contain" />
      <Image source={require("@/assets/images/GetStarted/leaves-right.png")} style={styles.leavesRight} contentFit="contain" />
      <Image source={require("@/assets/images/GetStarted/chicken-salad-bowl.png")} style={styles.bowl} contentFit="contain" />
      <Image source={require("@/assets/images/GetStarted/teal-accent.png")} style={styles.accent} contentFit="contain" />
      <Image source={require("@/assets/images/GetStarted/mint-wave.png")} style={styles.wave} contentFit="fill" />
      <View style={styles.nutritionPosition}><NutritionCard /></View>
      <View style={styles.balancedPosition}><BenefitCard label={"Balanced\nnutrition"} icon="leaf" /></View>
      <View style={styles.choicesPosition}><BenefitCard label={"Better\nchoices"} icon="bar-chart" warm /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  hero: {
    width: '100%',
    overflow: 'hidden',
  },

  backdropLeft: {
    position: 'absolute',
    left: '-20%',
    top: '18%',
    width: '90%',
    height: '70%',
    borderRadius: 100,
    backgroundColor: '#E9F3EC',
    transform: [
      {
        rotate: '-25deg',
      },
    ],
  },

  backdropRight: {
    position: 'absolute',
    right: '-24%',
    top: '5%',
    width: '48%',
    height: '90%',
    borderRadius: 65,
    backgroundColor: '#EDF4EF',
    transform: [
      {
        rotate: '25deg',
      },
    ],
  },

  leavesLeft: {
    position: 'absolute',
    left: '-5%',
    top: '28%',
    width: '25%',
    height: '28%',
    transform: [
      {
        rotate: '-28deg',
      },
    ],
  },

  leavesRight: {
    position: 'absolute',
    right: '-1%',
    top: '55%',
    width: '20%',
    height: '25%',
    transform: [
      {
        rotate: '14deg',
      },
    ],
  },

  bowl: {
    position: 'absolute',
    width: '112%',
    height: '87%',
    left: '-6%',
    top: '15%',
  },

  accent: {
    position: 'absolute',
    top: '18%',
    left: '60%',
    width: '10%',
    height: '10%',
  },

  wave: {
    position: 'absolute',
    bottom: -1,
    left: 0,
    width: '100%',
    height: '20%',
  },

  nutritionPosition: {
    position: 'absolute',
    top: '3%',
    left: '8%',
  },

  balancedPosition: {
    position: 'absolute',
    top: '34%',
    right: '5%',
  },

  choicesPosition: {
    position: 'absolute',
    bottom: '16%',
    left: '7%',
  },

  nutritionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 12,
    borderRadius: radius.xl,
    backgroundColor: colors.surface,
    boxShadow: '0px 8px 24px rgba(36, 76, 52, 0.09)',
  },

  calorieRing: {
    width: 66,
    height: 66,
    borderRadius: 33,
    borderWidth: 6,
    borderColor: colors.border,
    borderTopColor: colors.primary,
    borderRightColor: colors.primary,
    borderBottomColor: '#D6E9B4',
    alignItems: 'center',
    justifyContent: 'center',
  },

  calories: {
    fontFamily: 'Manrope-Bold',
    fontSize: 19,
    color: colors.textPrimary,
  },

  calorieUnit: {
    fontFamily: 'Manrope-Medium',
    fontSize: 9,
    color: colors.textSecondary,
  },

  nutrients: {
    gap: 9,
  },

  nutrientRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  nutrientDot: {
    width: 5,
    height: 5,
    borderRadius: radius.full,
  },

  nutrientLabel: {
    fontFamily: 'Manrope-Medium',
    fontSize: 9,
    color: colors.textSecondary,
    width: 36,
  },

  nutrientValue: {
    fontFamily: 'Manrope-Bold',
    fontSize: 9,
    color: colors.textPrimary,
  },

  benefitCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 10,
    borderRadius: radius.lg,
    backgroundColor: colors.surface,
    boxShadow: '0px 6px 18px rgba(36, 76, 52, 0.10)',
  },

  benefitIcon: {
    width: 32,
    height: 32,
    borderRadius: radius.full,
    backgroundColor: colors.primarySoft,
    alignItems: 'center',
    justifyContent: 'center',
  },

  warmIcon: {
    backgroundColor: '#FFF3DD',
  },

  benefitText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 10,
    lineHeight: 14,
    color: colors.textSecondary,
  },
});
