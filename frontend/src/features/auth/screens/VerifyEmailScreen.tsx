import Feather from "@expo/vector-icons/Feather";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const CODE_LENGTH = 6;
const RESEND_DELAY = 60;
const verificationPurple = "#5348DE";

type VerifyEmailScreenProps = {
  email: string;
  loading?: boolean;
  error?: string | null;
  onVerify: (code: string) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  onBack?: () => void;
};

export function VerifyEmailScreen({
  email,
  loading = false,
  error,
  onVerify,
  onResend,
  onBack,
}: VerifyEmailScreenProps) {
  const [code, setCode] = useState("");
  const [resendSeconds, setResendSeconds] = useState(RESEND_DELAY);
  const [focused, setFocused] = useState(false);
  const [resending, setResending] = useState(false);
  const busy = loading || resending;
  const resendTime = `${String(Math.floor(resendSeconds / 60)).padStart(2, "0")}:${String(resendSeconds % 60).padStart(2, "0")}`;

  useEffect(() => {
    if (resendSeconds <= 0) return;

    const timer = setTimeout(() => setResendSeconds((seconds) => seconds - 1), 1000);
    return () => clearTimeout(timer);
  }, [resendSeconds]);

  const handleVerify = async () => {
    if (code.length !== CODE_LENGTH || busy) return;

    await onVerify(code);
  };

  const handleResend = async () => {
    if (!onResend || busy || resendSeconds > 0) return;

    setResending(true);
    try {
      await onResend();
      setResendSeconds(RESEND_DELAY);
    } finally {
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        style={styles.keyboardContainer}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.screen}>
            {onBack && (
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityLabel="Go back"
                style={styles.backButton}
                onPress={onBack}
                disabled={busy}
                activeOpacity={0.7}
              >
                <Feather name="chevron-left" size={24} color="#171720" />
              </TouchableOpacity>
            )}

            <View style={styles.content}>
              <Text accessibilityRole="header" style={styles.title}>
                We just sent an email
              </Text>

              <Text style={styles.description}>
                Enter the security code we sent to
              </Text>

              <View style={styles.emailRow}>
                <Text style={styles.email}>{email}</Text>
                {onBack && (
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel="Edit email address"
                    onPress={onBack}
                    disabled={busy}
                    activeOpacity={0.7}
                    style={styles.editButton}
                  >
                    <Feather name="edit-2" size={14} color={verificationPurple} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.codeRow}>
                {Array.from({ length: CODE_LENGTH }, (_, index) => (
                  <View
                    key={index}
                    pointerEvents="none"
                    style={[
                      styles.digitBox,
                      focused && index === Math.min(code.length, CODE_LENGTH - 1) && styles.activeDigitBox,
                    ]}
                  >
                    <Text style={styles.digitText}>{code[index] ?? ""}</Text>
                  </View>
                ))}
                <TextInput
                  value={code}
                  onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, CODE_LENGTH))}
                  onFocus={() => setFocused(true)}
                  onBlur={() => setFocused(false)}
                  keyboardType="number-pad"
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  editable={!busy}
                  maxLength={CODE_LENGTH}
                  autoFocus
                  caretHidden
                  style={styles.codeInput}
                  accessibilityLabel="6-digit verification code"
                />
              </View>

              {!!error && (
                <Text
                  accessibilityLiveRegion="polite"
                  style={styles.error}
                >
                  {error}
                </Text>
              )}

              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{
                  disabled: busy || code.length !== CODE_LENGTH,
                  busy,
                }}
                disabled={busy || code.length !== CODE_LENGTH}
                activeOpacity={0.8}
                style={[
                  styles.verifyButton,
                  (busy || code.length !== CODE_LENGTH) && styles.disabledButton,
                ]}
                onPress={handleVerify}
              >
                {loading && !resending ? (
                  <ActivityIndicator color="#FFFFFF" />
                ) : (
                  <Text style={styles.verifyText}>Verify</Text>
                )}
              </TouchableOpacity>

              {onResend && (
                <View style={styles.resendSection}>
                  <Text style={styles.resendHint}>Didn&apos;t receive code?</Text>
                  <TouchableOpacity
                    accessibilityRole="button"
                    accessibilityLabel={resendSeconds > 0 ? `Resend code available in ${resendSeconds} seconds` : "Resend code"}
                    accessibilityState={{ disabled: busy || resendSeconds > 0, busy: resending }}
                    disabled={busy || resendSeconds > 0}
                    onPress={handleResend}
                    activeOpacity={0.7}
                    style={styles.resendButton}
                  >
                    <Text style={styles.resendText}>
                      {resending ? "Sending…" : "Resend"}
                      {resendSeconds > 0 && !resending && (
                        <Text style={styles.resendTimer}>
                          {` · ${resendTime}`}
                        </Text>
                      )}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  keyboardContainer: {
    flex: 1,
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 24,
  },

  screen: {
    width: "100%",
    maxWidth: 480,
    alignSelf: "center",
    paddingHorizontal: 20,
    paddingTop: 4,
  },

  backButton: {
    width: 44,
    height: 44,
    alignItems: "center",
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
    paddingTop: 36,
  },

  title: {
    fontFamily: "Manrope-Bold",
    fontSize: 20,
    lineHeight: 28,
    color: "#171720",
    textAlign: "center",
  },

  description: {
    marginTop: 4,
    maxWidth: 320,
    fontFamily: "Manrope-Regular",
    fontSize: 15,
    lineHeight: 22,
    color: "#777780",
    textAlign: "center",
  },

  emailRow: {
    width: "100%",
    marginTop: 2,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  email: {
    flexShrink: 1,
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#777780",
    textAlign: "center",
  },

  editButton: {
    width: 44,
    height: 44,
    marginVertical: -11,
    alignItems: "center",
    justifyContent: "center",
  },

  codeRow: {
    width: "100%",
    maxWidth: 320,
    marginTop: 48,
    flexDirection: "row",
    gap: 10,
  },

  digitBox: {
    flex: 1,
    minWidth: 0,
    height: 54,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#AAA3EB",
    borderRadius: 6,
    backgroundColor: "#FAF9FF",
  },

  activeDigitBox: {
    borderColor: verificationPurple,
    backgroundColor: "#F1EFFF",
  },

  digitText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 20,
    color: "#292538",
  },

  codeInput: {
    position: "absolute",
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    opacity: 0,
  },

  error: {
    width: "100%",
    marginTop: 10,
    fontFamily: "Manrope-Regular",
    fontSize: 13,
    lineHeight: 20,
    color: "#B84242",
    textAlign: "center",
  },

  verifyButton: {
    width: "100%",
    minHeight: 54,
    marginTop: 48,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 6,
    backgroundColor: verificationPurple,
  },

  verifyText: {
    fontFamily: "Manrope-SemiBold",
    fontSize: 16,
    color: "#FFFFFF",
  },

  disabledButton: {
    opacity: 0.65,
  },

  resendSection: {
    marginTop: 18,
    alignItems: "center",
  },

  resendHint: {
    fontFamily: "Manrope-Regular",
    fontSize: 14,
    lineHeight: 22,
    color: "#9998A1",
  },

  resendButton: {
    minHeight: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  resendText: {
    fontFamily: "Manrope-Medium",
    fontSize: 14,
    lineHeight: 22,
    color: verificationPurple,
  },

  resendTimer: {
    fontFamily: "Manrope-Regular",
    color: "#9998A1",
  },
});
