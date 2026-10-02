import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginMethod from "@/components/bottomSheets/LoginMethod";
import { colors, spacing } from "@/theme/theme";
import { HabitsHero } from "../components/HabitsHero";
import { NutritionHero } from "../components/NutritionHero";
import { OnboardingFooter } from "../components/OnboardingFooter";
import { OnboardingHeader } from "../components/OnboardingHeader";
import { ProgressHero } from "../components/ProgressHero";

const slides = [
  { title: "Understand\nwhat you eat.", description: "Track your nutrition and see how your daily choices support your goals." },
  { title: "See your\nprogress clearly.", description: "Track your meals, activity, and daily targets in one simple view." },
  { title: "Build habits\nthat fit your life.", description: "Create routines for meals, movement, and progress that feel simple and sustainable every day." },
];

export function GetStartedScreen() {
  const router = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const scrollRef = useRef<ScrollView>(null);
  const { width, height } = useWindowDimensions();
  const isLastSlide = activeIndex === slides.length - 1;
  const heroHeight = isLastSlide
    ? Math.min(width * 0.93, height * 0.46, 446)
    : Math.min(width * 1.02, height * 0.47, 460);
  const slide = slides[activeIndex];
  const openAuth = () => router.replace("/auth");
  const selectSlide = (index: number) => {
    setActiveIndex(index);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };
  const next = () => {
    if (isLastSlide) setIsModalVisible(true);
    else selectSlide(activeIndex + 1);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        <OnboardingHeader onSkip={openAuth} showSkip={!isLastSlide} />
        <ScrollView ref={scrollRef} style={styles.content} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {isLastSlide ? <HabitsHero height={heroHeight} /> : activeIndex === 1 ? <ProgressHero height={heroHeight} /> : <NutritionHero height={heroHeight} />}
          <View style={styles.copy} accessibilityLiveRegion="polite">
            <Text accessibilityRole="header" style={[styles.title, activeIndex === 1 && {
              fontSize: Math.min(38, width * 0.09),
              lineHeight: Math.min(43, width * 0.105),
            }, isLastSlide && styles.habitsTitle, isLastSlide && {
              fontSize: Math.min(38, width * 0.087),
              lineHeight: Math.min(43, width * 0.099),
            }]}>{slide.title}</Text>
            <Text style={[styles.description, isLastSlide && styles.habitsDescription]}>{slide.description}</Text>
          </View>
        </ScrollView>
        <OnboardingFooter onNext={next} onSelectPage={selectSlide} activeIndex={activeIndex} pageCount={slides.length} label={isLastSlide ? "Get Started" : "Next"} />
      </View>
      <LoginMethod visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  screen: {
    flex: 1,
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
  },

  content: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
  },

  copy: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: spacing[8],
    paddingTop: spacing[4],
    paddingBottom: spacing[4],
    gap: spacing[3],
  },

  title: {
    textAlign: 'center',
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 38,
    lineHeight: 43,
    letterSpacing: -1.2,
    color: colors.textPrimary,
  },

  description: {
    maxWidth: 340,
    textAlign: 'center',
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },

  habitsTitle: {
    fontFamily: 'Fraunces-Bold',
    color: '#050909',
    letterSpacing: -1.3,
  },

  habitsDescription: {
    color: '#5D6170',
    lineHeight: 22,
  },
});
