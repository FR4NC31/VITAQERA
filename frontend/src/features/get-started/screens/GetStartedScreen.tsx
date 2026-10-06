import { useAuth, useSSO } from "@clerk/expo";
import { useSignInWithGoogle } from "@clerk/expo/google";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Alert, ScrollView, StyleSheet, Text, useWindowDimensions, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import LoginMethod, { type LoginProvider } from "@/components/bottomSheets/LoginMethod";
import { syncCurrentUser } from "@/services/userApi";
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
  const { startGoogleAuthenticationFlow } = useSignInWithGoogle();
  const { startSSOFlow } = useSSO();
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const [loadingProvider, setLoadingProvider] = useState<"google" | "facebook" | null>(null);
  const [awaitingSession, setAwaitingSession] = useState(false);
  const signInBusy = useRef(false);
  const syncStartedRef = useRef(false);
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

  useEffect(() => {
    if (!isLoaded || !isSignedIn) return;

    if (!awaitingSession) {
      router.replace("/onboarding");
      return;
    }

    if (syncStartedRef.current) return;
    syncStartedRef.current = true;

    setIsModalVisible(false);
    signInBusy.current = false;
    setLoadingProvider(null);
    router.replace("/onboarding");

    const syncUser = async () => {
      try {
        const token = await getToken();
        if (!token) throw new Error("Unable to get authentication token.");
        await syncCurrentUser(token);
      } catch (error) {
        if (__DEV__) console.warn("[Auth] Social user sync failed:", error);
      }
    };

    void syncUser();
  }, [awaitingSession, isLoaded, isSignedIn, getToken, router]);

  const openAuth = () => router.replace("/auth");
  const selectSlide = (index: number) => {
    setActiveIndex(index);
  };
  const next = () => {
    if (isLastSlide) setIsModalVisible(true);
    else selectSlide(activeIndex + 1);
  };

  const handleContinue = async (provider: LoginProvider) => {
    if (provider === "email") {
      setIsModalVisible(false);
      router.push("/auth");
      return;
    }

    if (signInBusy.current || !isLoaded) return;

    signInBusy.current = true;
    setLoadingProvider(provider);

    if (isSignedIn) {
      setAwaitingSession(true);
      return;
    }

    let sessionActivated = false;

    try {
      const facebookResult = provider === "facebook"
        ? await startSSOFlow({ strategy: "oauth_facebook", redirectUrl: "vitaqera://sso-callback" })
        : null;
      const { createdSessionId, setActive } = facebookResult ?? await startGoogleAuthenticationFlow();

      if (!createdSessionId) {
        if (facebookResult?.authSessionResult?.type === "success") {
          throw new Error("Facebook authentication did not create a session.");
        }
        return;
      }
      if (!setActive) throw new Error(`${provider} authentication did not create a session.`);

      await setActive({ session: createdSessionId });
      sessionActivated = true;
      setAwaitingSession(true);
    } catch (error) {
      Alert.alert(`${provider === "facebook" ? "Facebook" : "Google"} sign-in failed`, "Please try again.");
      if (__DEV__) console.warn(`[Auth] ${provider} sign-in failed:`, error);
    } finally {
      if (!sessionActivated) {
        signInBusy.current = false;
        setLoadingProvider(null);
      }
    }
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
      <LoginMethod visible={isModalVisible} onClose={() => setIsModalVisible(false)} onContinue={handleContinue} loadingProvider={loadingProvider} />
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
