import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { useRouter } from 'expo-router';
import { useCallback, useLayoutEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from 'react-native';
import Animated, {
  Easing,
  LinearTransition,
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '@/theme/theme';

import { AuthBackground } from '../components/AuthBackground';
import { AuthField } from '../components/AuthField';

type AuthMode = 'sign-in' | 'sign-up';

const transitionDuration = 330;
const transitionEasing = Easing.inOut(Easing.cubic);
const layoutTransition = LinearTransition.duration(transitionDuration).easing(transitionEasing);

export type AuthFormValues = {
  email: string;
  password: string;
};

type FormValues = AuthFormValues & { confirmPassword: string };
type FormErrors = Partial<Record<keyof FormValues, string>>;

type AuthScreenProps = {
  onSignIn?: (values: AuthFormValues) => void | Promise<void>;
  onSignUp?: (values: AuthFormValues) => void | Promise<void>;
  onForgotPassword?: (email: string) => void;
  successMessage?: string | null;
  syncError?: string | null;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
};

export function AuthScreen({
  onSignIn,
  onSignUp,
  onForgotPassword,
  successMessage,
  syncError,
  onTermsPress,
  onPrivacyPress,
}: AuthScreenProps = {}) {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [mode, setMode] = useState<AuthMode>('sign-in');
  const [form, setForm] = useState<FormValues>({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitError, setSubmitError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const submittingRef = useRef(false);
  const [switching, setSwitching] = useState(false);
  const [tabWidth, setTabWidth] = useState(0);
  const tabProgress = useSharedValue(0);
  const contentTranslateX = useSharedValue(0);
  const introductionOpacity = useSharedValue(1);
  const pendingTransition = useRef<{ mode: AuthMode; direction: -1 | 1 } | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const isSignUp = mode === 'sign-up';
  const panelWidth = Math.min(width, 480);
  const contentSlideStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: contentTranslateX.get(),
      },
    ],
  }));
  const introductionFadeStyle = useAnimatedStyle(() => ({
    opacity: introductionOpacity.get(),
  }));
  const indicatorStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: tabProgress.get() * tabWidth,
      },
    ],
  }));

  const finishTransition = useCallback(() => {
    pendingTransition.current = null;
    setSwitching(false);
  }, []);

  const changeMode = useCallback((nextMode: AuthMode) => {
    const transition = pendingTransition.current;
    if (!transition) return;
    contentTranslateX.set(transition.direction * panelWidth);
    setMode(nextMode);
    setForm((current) => ({ ...current, password: '', confirmPassword: '' }));
    setErrors({});
    setSubmitError('');
  }, [contentTranslateX, panelWidth]);

  useLayoutEffect(() => {
    if (pendingTransition.current?.mode !== mode) return;
    introductionOpacity.set(withTiming(1, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    }));
    contentTranslateX.set(withTiming(0, {
      duration: 180,
      easing: Easing.out(Easing.cubic),
    }, (finished) => {
      if (finished) runOnJS(finishTransition)();
    }));
  }, [mode, contentTranslateX, introductionOpacity, finishTransition]);

  const updateField = (field: keyof FormValues, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
    setErrors((current) => ({ ...current, [field]: undefined }));
    setSubmitError('');
  };

  const forgotPassword = () => {
    if (!onForgotPassword || submitting || submittingRef.current || switching) return;
    Keyboard.dismiss();
    onForgotPassword(form.email.trim());
  };

  const selectMode = (nextMode: AuthMode) => {
    if (submitting || switching || pendingTransition.current || mode === nextMode) return;
    Keyboard.dismiss();
    scrollRef.current?.scrollTo({ y: 0, animated: false });
    tabProgress.set(withTiming(nextMode === 'sign-up' ? 1 : 0, {
      duration: transitionDuration,
      easing: transitionEasing,
    }));
    const direction = nextMode === 'sign-up' ? 1 : -1;
    pendingTransition.current = { mode: nextMode, direction };
    setSwitching(true);
    introductionOpacity.set(withTiming(0, {
      duration: 150,
      easing: Easing.in(Easing.cubic),
    }));
    contentTranslateX.set(withTiming(-direction * panelWidth, {
      duration: 150,
      easing: Easing.in(Easing.cubic),
    }, (finished) => {
      if (finished) runOnJS(changeMode)(nextMode);
    }));
  };

  const submit = async () => {
    if (submitting || submittingRef.current || switching) return;
    const nextErrors: FormErrors = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      nextErrors.email = 'Please enter a valid email address.';
    }
    if (!form.password) {
      nextErrors.password = 'Please enter your password.';
    } else if (isSignUp && !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(form.password)) {
      nextErrors.password = 'Use 8 or more characters with uppercase, lowercase, a number, and a symbol.';
    }
    if (isSignUp && !form.confirmPassword) {
      nextErrors.confirmPassword = 'Please confirm your password.';
    } else if (isSignUp && form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = 'Your passwords don’t match.';
    }
    setErrors(nextErrors);
    setSubmitError('');
    if (Object.keys(nextErrors).length) return;

    Keyboard.dismiss();
    const onSubmit = isSignUp ? onSignUp : onSignIn;
    if (!onSubmit) return;
    submittingRef.current = true;
    setSubmitting(true);
    try {
      await onSubmit({ email: form.email.trim(), password: form.password });
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : isSignUp ? 'Unable to create your account. Please try again.' : 'Unable to sign in. Please try again.');
    } finally {
      submittingRef.current = false;
      setSubmitting(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AuthBackground />
      <KeyboardAvoidingView style={styles.keyboardContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView
          ref={scrollRef}
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.screen}>
            <Animated.View layout={layoutTransition} style={styles.header}>
              <TouchableOpacity
                activeOpacity={0.7}
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={styles.backButton}
                onPress={() => router.canGoBack() ? router.back() : router.replace('/get-started')}
              >
                <Feather name="chevron-left" size={27} color="#142C30" />
              </TouchableOpacity>
              <View style={styles.brand} accessible accessibilityLabel="VitaQera">
                <Image source={require('@/assets/images/Icons/VQ_AppIcon.png')} style={styles.logo} contentFit="contain" />
                <Text style={styles.brandName}>VitaQera</Text>
              </View>
            </Animated.View>

            <Animated.View layout={layoutTransition} style={styles.introductionViewport} collapsable={false}>
              <Animated.View
                style={[styles.introduction, introductionFadeStyle]}
                accessibilityLiveRegion="polite"
              >
                <Text
                  accessibilityRole="header"
                  style={[
                    styles.title,
                    {
                      fontSize: Math.min(isSignUp ? 34 : 36, width * (isSignUp ? 0.083 : 0.095)),
                    },
                  ]}
                >
                  {isSignUp ? 'Create your account.' : 'Welcome back.'}
                </Text>
                <Text style={[styles.description, !isSignUp && styles.signInDescription]}>
                  {isSignUp
                    ? 'Save your progress and build your personalized nutrition plan.'
                    : 'Sign in to continue your VitaQera journey.'}
                </Text>
              </Animated.View>
            </Animated.View>

            <Animated.View
              layout={layoutTransition}
              style={styles.tabs}
              accessibilityRole="tablist"
              onLayout={(event) => setTabWidth(Math.max(0, (event.nativeEvent.layout.width - 8) / 2))}
            >
              <Animated.View
                pointerEvents="none"
                style={[
                  styles.selectedTab,
                  {
                    width: tabWidth,
                  },
                  indicatorStyle,
                ]}
              />
              {(['sign-in', 'sign-up'] as const).map((tab) => (
                <TouchableOpacity
                  key={tab}
                  activeOpacity={0.7}
                  accessibilityRole="tab"
                  accessibilityState={{ selected: mode === tab, disabled: submitting || switching }}
                  disabled={submitting || switching}
                  onPress={() => selectMode(tab)}
                  style={styles.tab}
                >
                  <Text style={[styles.tabText, mode === tab && styles.selectedTabText]}>
                    {tab === 'sign-in' ? 'Sign In' : 'Sign Up'}
                  </Text>
                </TouchableOpacity>
              ))}
            </Animated.View>

            <Animated.View
              layout={layoutTransition}
              style={styles.formViewport}
              collapsable={false}
              pointerEvents={switching ? 'none' : 'auto'}
            >
              <Animated.View
                style={[styles.formCard, contentSlideStyle]}
              >
                <View style={styles.fields}>
                  <AuthField
                    label="Email address"
                    icon="mail"
                    placeholder={isSignUp ? 'name@example.com' : 'you@example.com'}
                    value={form.email}
                    onChangeText={(value) => updateField('email', value)}
                    keyboardType="email-address"
                    autoComplete="email"
                    textContentType="emailAddress"
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!submitting}
                    error={errors.email}
                  />
                  <AuthField
                    key={`password-${mode}`}
                    label={isSignUp ? 'Create password' : 'Password'}
                    icon="lock"
                    password
                    placeholder="Enter password"
                    value={form.password}
                    onChangeText={(value) => updateField('password', value)}
                    autoComplete={isSignUp ? 'new-password' : 'current-password'}
                    textContentType={isSignUp ? 'newPassword' : 'password'}
                    autoCapitalize="none"
                    autoCorrect={false}
                    editable={!submitting}
                    returnKeyType={isSignUp ? 'next' : 'go'}
                    onSubmitEditing={isSignUp ? undefined : submit}
                    error={errors.password}
                    helperText={isSignUp ? 'Use at least 8 characters with uppercase, lowercase, number, and symbol.' : undefined}
                    labelAction={!isSignUp && (
                      <TouchableOpacity
                        activeOpacity={0.7}
                        accessibilityRole="button"
                        hitSlop={12}
                        disabled={submitting}
                        onPress={forgotPassword}
                      >
                        <Text style={styles.forgotPassword}>Forgot password?</Text>
                      </TouchableOpacity>
                    )}
                  />
                  {isSignUp && (
                    <AuthField
                      label="Confirm password"
                      icon="shield"
                      password
                      placeholder="Re-enter password"
                      value={form.confirmPassword}
                      onChangeText={(value) => updateField('confirmPassword', value)}
                      autoComplete="new-password"
                      textContentType="newPassword"
                      autoCapitalize="none"
                      autoCorrect={false}
                      editable={!submitting}
                      returnKeyType="go"
                      onSubmitEditing={submit}
                      error={errors.confirmPassword}
                    />
                  )}
                </View>

                {(syncError || submitError) && <Text accessibilityLiveRegion="polite" style={styles.submitError}>{syncError || submitError}</Text>}
                {!isSignUp && successMessage && <Text accessibilityLiveRegion="polite" style={styles.successMessage}>{successMessage}</Text>}
                <TouchableOpacity
                  activeOpacity={0.75}
                  accessibilityRole="button"
                  accessibilityState={{ disabled: submitting, busy: submitting }}
                  disabled={submitting}
                  onPress={submit}
                  style={[styles.submitButton, submitting && styles.disabledButton]}
                >
                  {submitting ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <>
                      <Text style={styles.submitText}>{isSignUp ? 'Create Account' : 'Sign In'}</Text>
                      <Feather name="arrow-right" size={20} color="#FFFFFF" />
                    </>
                  )}
                </TouchableOpacity>

                {isSignUp && (
                  <Text style={styles.consent}>
                    By creating an account, you agree to VitaQera’s{'\n'}
                    <Text style={styles.legalLink} onPress={onTermsPress} accessibilityRole={onTermsPress ? 'link' : undefined}>
                      Terms of Service
                    </Text>
                    {' and '}
                    <Text style={styles.legalLink} onPress={onPrivacyPress} accessibilityRole={onPrivacyPress ? 'link' : undefined}>
                      Privacy Policy
                    </Text>
                    .
                  </Text>
                )}
              </Animated.View>
            </Animated.View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#EEFCF7',
    experimental_backgroundImage: 'linear-gradient(160deg, #FAFFFD 0%, #E8FAF4 100%)',
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollView: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },

  screen: {
    width: '100%',
    maxWidth: 480,
    alignSelf: 'center',
    paddingHorizontal: 20,
    flexGrow: 1,
  },

  header: {
    minHeight: 64,
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButton: {
    position: 'absolute',
    left: 0,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },

  logo: {
    width: 44,
    height: 44,
  },

  brandName: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    letterSpacing: -0.6,
    color: '#102C2C',
  },

  introduction: {
    alignItems: 'center',
    marginTop: 22,
    marginBottom: 26,
    gap: 8,
  },

  introductionViewport: {
    overflow: 'hidden',
  },

  title: {
    fontFamily: 'Fraunces-SemiBold',
    lineHeight: 44,
    letterSpacing: -1.2,
    textAlign: 'center',
    color: '#092522',
  },

  description: {
    minHeight: 46,
    maxWidth: 310,
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 23,
    textAlign: 'center',
    color: '#657C89',
  },

  signInDescription: {
    maxWidth: 280,
  },

  tabs: {
    minHeight: 48,
    padding: 4,
    marginHorizontal: 20,
    flexDirection: 'row',
    borderRadius: 16,
    backgroundColor: '#DDF1EB',
    experimental_backgroundImage: 'linear-gradient(90deg, #E1F4ED 0%, #D5EEE6 100%)',
  },

  tab: {
    flex: 1,
    minHeight: 40,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },

  selectedTab: {
    position: 'absolute',
    top: 4,
    bottom: 4,
    left: 4,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 3px 10px rgba(30, 95, 76, 0.08)',
  },

  tabText: {
    fontFamily: 'Manrope-Medium',
    fontSize: 14,
    lineHeight: 20,
    color: '#607A86',
  },

  selectedTabText: {
    fontFamily: 'Manrope-SemiBold',
    color: '#19313D',
  },

  formCard: {
    marginTop: 16,
    padding: 24,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    boxShadow: '0px 8px 28px rgba(36, 104, 83, 0.04)',
  },

  formViewport: {
    marginHorizontal: -20,
    paddingHorizontal: 20,
    paddingBottom: 8,
    overflow: 'hidden',
  },

  fields: {
    gap: 16,
  },

  forgotPassword: {
    fontFamily: 'Manrope-Medium',
    fontSize: 12,
    lineHeight: 20,
    color: '#009A91',
  },

  submitButton: {
    minHeight: 56,
    marginTop: 20,
    paddingVertical: 16,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    borderRadius: 18,
    backgroundColor: colors.primary,
  },

  submitText: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 16,
    lineHeight: 24,
    color: '#FFFFFF',
  },

  disabledButton: {
    opacity: 0.65,
  },

  submitError: {
    marginTop: 12,
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: '#B84242',
  },

  successMessage: {
    marginTop: 12,
    fontFamily: 'Manrope-Regular',
    fontSize: 13,
    lineHeight: 20,
    color: colors.primary,
  },

  consent: {
    marginTop: 18,
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: '#7A8998',
  },

  legalLink: {
    color: '#178F87',
    textDecorationLine: 'underline',
  },
});
