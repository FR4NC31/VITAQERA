import Feather from '@expo/vector-icons/Feather';
import { Image } from 'expo-image';
import { StyleSheet, Text, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { router } from 'expo-router';
import { BottomSheet } from '@/components/BottomSheet';
import { colors, radius, spacing } from '@/theme/theme';

export type LoginProvider = 'google' | 'facebook' | 'email';

type LoginMethodProps = {
  visible: boolean;
  onClose: () => void;
  onContinue?: (provider: LoginProvider) => void;
  onTermsPress?: () => void;
  onPrivacyPress?: () => void;
};

const providers = [
  {
    id: 'google',
    label: 'Continue with Google',
    icon: require('@/assets/images/Icons/googleIcon.svg'),
  },
  {
    id: 'facebook',
    label: 'Continue with Facebook',
    icon: require('@/assets/images/Icons/facebookIcon.svg'),
  },
] as const;

function LoginDecoration() {
  return (
    <View style={styles.decoration}>
      <View style={styles.topWash} />
      <View style={styles.leftWash} />
      <View style={styles.bottomWash} />
      <Image
        source={require('@/assets/images/GetStarted/leaves-left.png')}
        style={styles.leavesLeft}
        contentFit="contain"
      />
      <Image
        source={require('@/assets/images/GetStarted/leaves-right.png')}
        style={styles.leavesRight}
        contentFit="contain"
      />
      <Image
        source={require('@/assets/images/GetStarted/leaves-left.png')}
        style={styles.leavesBottom}
        contentFit="contain"
      />
      <View style={[styles.seed, styles.seedLeft]} />
      <View style={[styles.seed, styles.seedTop]} />
      <View style={[styles.seed, styles.seedTopSmall]} />
      <View style={[styles.seed, styles.seedRight]} />
      <View style={[styles.seed, styles.seedBottom]} />
    </View>
  );
}

export default function LoginMethod({
  visible,
  onClose,
  onContinue,
  onTermsPress,
  onPrivacyPress,
}: LoginMethodProps) {
  const { height } = useWindowDimensions();

  return (
    <BottomSheet
      visible={visible}
      onClose={onClose}
      height={Math.min(560, height * 0.85)}
      accessibilityLabel="Sign in or create your VitaQera account"
      background={<LoginDecoration />}
      sheetStyle={styles.sheet}
      contentContainerStyle={styles.sheetContent}
    >
      <View style={styles.container}>
        <View style={styles.brand} accessible accessibilityLabel="VitaQera">
          <Image
            source={require('@/assets/images/Icons/VQ_AppIcon.png')}
            style={styles.brandIcon}
            contentFit="contain"
          />
          <Text style={styles.brandName}>VitaQera</Text>
        </View>

        <View style={styles.introduction}>
          <Text accessibilityRole="header" style={styles.title}>Let’s get you started.</Text>
          <Text style={styles.description}>
            Sign in or create your account to save your progress and personalized plan.
          </Text>
        </View>

        <View style={styles.actions}>
          <View style={styles.socialButtons}>
            {providers.map((provider) => (
              <TouchableOpacity
                key={provider.id}
                activeOpacity={0.7}
                onPress={() => onContinue?.(provider.id)}
                accessibilityRole="button"
                accessibilityLabel={provider.label}
                style={[styles.button, styles.socialButton]}
              >
                <Image source={provider.icon} style={styles.providerIcon} contentFit="contain" />
                <Text style={styles.buttonText}>{provider.label}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>or</Text>
            <View style={styles.dividerLine} />
          </View>

          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              onClose();
              if (onContinue) {
                onContinue('email');
              } else {
                router.push('/auth/auth');
              }
            }}
            accessibilityRole="button"
            accessibilityLabel="Continue with Email"
            style={[styles.button, styles.emailButton]}
          >
            <View style={styles.providerIcon}>
              <Feather name="mail" size={21} color={colors.textInverse} />
            </View>
            <Text style={[styles.buttonText, styles.emailText]}>Continue with Email</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.consent}>
          By continuing, you agree to VitaQera’s{'\n'}
          <Text
            style={styles.legalLink}
            onPress={onTermsPress}
            accessibilityRole={onTermsPress ? 'link' : undefined}
          >
            Terms of Service
          </Text>
          {' and '}
          <Text
            style={styles.legalLink}
            onPress={onPrivacyPress}
            accessibilityRole={onPrivacyPress ? 'link' : undefined}
          >
            Privacy Policy
          </Text>
          .
        </Text>
      </View>
    </BottomSheet>
  );
}

const styles = StyleSheet.create({
  sheet: {
    backgroundColor: '#FCFEFD',
    borderTopLeftRadius: 36,
    borderTopRightRadius: 36,
  },

  sheetContent: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[3],
  },

  container: {
    width: '100%',
    alignItems: 'center',
  },

  brand: {
    alignItems: 'center',
  },

  brandIcon: {
    width: 62,
    height: 62,
  },

  brandName: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 18,
    lineHeight: 24,
    color: '#123B3D',
  },

  introduction: {
    alignItems: 'center',
    marginTop: spacing[3],
    gap: spacing[2],
  },

  title: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.8,
    textAlign: 'center',
    color: '#123B3D',
  },

  description: {
    maxWidth: 300,
    fontFamily: 'Manrope-Regular',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#708688',
  },

  actions: {
    width: '100%',
    marginTop: spacing[5],
  },

  socialButtons: {
    gap: spacing[3],
  },

  button: {
    minHeight: 54,
    paddingVertical: spacing[3],
    paddingHorizontal: spacing[12] + spacing[4],
    borderRadius: radius.full,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },

  socialButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: '#E4ECEA',
    boxShadow: '0px 3px 8px rgba(20, 59, 55, 0.06)',
  },

  providerIcon: {
    position: 'absolute',
    left: spacing[8],
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttonText: {
    flex: 1,
    fontFamily: 'Manrope-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'center',
    color: '#163B43',
  },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing[3],
    marginVertical: spacing[4],
  },

  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#E1EBE8',
  },

  dividerText: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 16,
    color: '#708688',
  },

  emailButton: {
    backgroundColor: '#009E95',
    boxShadow: '0px 5px 12px rgba(0, 158, 149, 0.16)',
  },

  emailText: {
    color: colors.textInverse,
  },

  consent: {
    marginTop: spacing[4],
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 19,
    textAlign: 'center',
    color: '#7A9290',
  },

  legalLink: {
    color: '#248F86',
    textDecorationLine: 'underline',
  },

  decoration: {
    flex: 1,
    overflow: 'hidden',
  },

  topWash: {
    position: 'absolute',
    top: -94,
    right: -30,
    width: 166,
    height: 146,
    borderRadius: radius.full,
    backgroundColor: '#EAF7F2',
  },

  leftWash: {
    position: 'absolute',
    top: 142,
    left: -110,
    width: 168,
    height: 96,
    borderRadius: radius.full,
    backgroundColor: '#F0F9F5',
    transform: [
      {
        rotate: '-45deg',
      },
    ],
  },

  bottomWash: {
    position: 'absolute',
    bottom: -126,
    right: -38,
    width: 240,
    height: 182,
    borderRadius: radius.full,
    backgroundColor: '#EAF7F2',
    transform: [
      {
        rotate: '-35deg',
      },
    ],
  },

  leavesLeft: {
    position: 'absolute',
    top: 34,
    left: 8,
    width: 49,
    height: 55,
    opacity: 0.8,
    transform: [
      {
        rotate: '-15deg',
      },
    ],
  },

  leavesRight: {
    position: 'absolute',
    top: 26,
    right: -37,
    width: 96,
    height: 105,
    opacity: 0.85,
    transform: [
      {
        rotate: '-26deg',
      },
    ],
  },

  leavesBottom: {
    position: 'absolute',
    bottom: -16,
    left: -53,
    width: 97,
    height: 135,
    opacity: 0.85,
    transform: [
      {
        rotate: '30deg',
      },
    ],
  },

  seed: {
    position: 'absolute',
    width: 6,
    height: 15,
    borderRadius: radius.full,
    backgroundColor: '#FDC66D',
    transform: [
      {
        rotate: '35deg',
      },
    ],
  },

  seedLeft: {
    top: 96,
    left: 15,
  },

  seedTop: {
    top: 64,
    right: 118,
  },

  seedTopSmall: {
    top: 74,
    right: 104,
    height: 11,
  },

  seedRight: {
    top: 145,
    right: 6,
    height: 9,
    backgroundColor: '#F2B898',
  },

  seedBottom: {
    bottom: 18,
    left: 69,
    height: 9,
    backgroundColor: '#ADC979',
  },
});
