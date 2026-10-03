import Feather from "@expo/vector-icons/Feather";
import { useEffect, useRef, useState } from "react";
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

import { colors } from "@/theme/theme";

const COOLDOWN_MS = 30_000;

type ForgotPasswordOtpScreenProps = {
  email: string;
  loading: boolean;
  error: string | null;
  onVerify: (code: string) => void | Promise<void>;
  onResend: () => Promise<boolean>;
  onBack: () => void;
};

export function ForgotPasswordOtpScreen({ email, loading, error, onVerify, onResend, onBack }: ForgotPasswordOtpScreenProps) {
  const [code, setCode] = useState("");
  const [deadline, setDeadline] = useState(() => Date.now() + COOLDOWN_MS);
  const [now, setNow] = useState(() => Date.now());
  const [resending, setResending] = useState(false);
  const busyRef = useRef(false);
  const remaining = Math.max(0, Math.ceil((deadline - now) / 1000));
  const busy = loading || resending;

  useEffect(() => {
    if (remaining === 0) return;
    const timer = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(timer);
  }, [remaining]);

  const verify = async () => {
    if (code.length !== 6 || busy || busyRef.current) return;
    busyRef.current = true;
    try {
      await onVerify(code);
    } finally {
      busyRef.current = false;
    }
  };

  const resend = async () => {
    if (busy || busyRef.current || remaining > 0) return;
    busyRef.current = true;
    setResending(true);
    try {
      if (await onResend()) {
        const sentAt = Date.now();
        setDeadline(sentAt + COOLDOWN_MS);
        setNow(sentAt);
        setCode("");
      }
    } finally {
      busyRef.current = false;
      setResending(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" disabled={busy} onPress={onBack} style={styles.backButton}>
              <Feather name="chevron-left" size={27} color="#142C30" />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.iconContainer}><Feather name="mail" size={30} color={colors.primary} /></View>
              <Text accessibilityRole="header" style={styles.title}>Check your email</Text>
              <Text style={styles.description}>We sent a 6-digit verification code to</Text>
              <Text style={styles.email}>{email}</Text>
              <View style={styles.codeRow}>
                {Array.from({ length: 6 }, (_, index) => (
                  <View key={index} pointerEvents="none" style={styles.digitBox}>
                    <Text style={styles.digitText}>{code[index] ?? ""}</Text>
                  </View>
                ))}
                <TextInput
                  value={code}
                  onChangeText={(value) => setCode(value.replace(/\D/g, "").slice(0, 6))}
                  keyboardType="number-pad"
                  autoComplete="one-time-code"
                  textContentType="oneTimeCode"
                  maxLength={6}
                  caretHidden
                  editable={!busy}
                  style={styles.codeInput}
                  accessibilityLabel="6-digit verification code"
                />
              </View>
              {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ disabled: busy || code.length !== 6, busy }}
                disabled={busy || code.length !== 6}
                onPress={verify}
                style={[styles.button, (busy || code.length !== 6) && styles.disabledButton]}
              >
                {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Verify Code</Text>}
              </TouchableOpacity>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={{ disabled: busy || remaining > 0, busy: resending }}
                disabled={busy || remaining > 0}
                onPress={resend}
                style={styles.resendButton}
              >
                <Text style={styles.resendText}>
                  {resending ? "Sending code..." : remaining > 0 ? `Resend code in ${remaining}s` : "Didn't receive the code? Resend"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: "#F8FCFB" },
  flex: { flex: 1 },
  scrollContent: { flexGrow: 1, paddingBottom: 24 },
  screen: { flexGrow: 1, width: "100%", maxWidth: 480, alignSelf: "center", paddingHorizontal: 20 },
  backButton: { width: 44, height: 44, alignItems: "center", justifyContent: "center" },
  content: { flexGrow: 1, alignItems: "center", justifyContent: "center", paddingVertical: 48 },
  iconContainer: { width: 64, height: 64, borderRadius: 20, alignItems: "center", justifyContent: "center", backgroundColor: "#CCFBF1", marginBottom: 24 },
  title: { fontFamily: "Fraunces-SemiBold", fontSize: 32, lineHeight: 40, color: "#10201D", textAlign: "center" },
  description: { marginTop: 10, maxWidth: 320, fontFamily: "Manrope-Regular", fontSize: 15, lineHeight: 22, color: "#657C89", textAlign: "center" },
  email: { maxWidth: "100%", fontFamily: "Manrope-SemiBold", fontSize: 15, lineHeight: 24, color: "#10201D", textAlign: "center" },
  codeRow: { width: "100%", maxWidth: 320, marginTop: 32, flexDirection: "row", gap: 8 },
  digitBox: { flex: 1, minWidth: 0, height: 54, alignItems: "center", justifyContent: "center", borderWidth: 1, borderColor: "#D7E5E0", borderRadius: 12, backgroundColor: "#FFFFFF" },
  digitText: { fontFamily: "Manrope-SemiBold", fontSize: 20, color: "#10201D" },
  codeInput: { position: "absolute", top: 0, right: 0, bottom: 0, left: 0, opacity: 0 },
  error: { width: "100%", marginTop: 12, fontFamily: "Manrope-Regular", fontSize: 13, lineHeight: 20, color: "#B84242", textAlign: "center" },
  button: { width: "100%", minHeight: 56, marginTop: 24, alignItems: "center", justifyContent: "center", borderRadius: 18, backgroundColor: colors.primary },
  disabledButton: { opacity: 0.6 },
  buttonText: { fontFamily: "Manrope-SemiBold", fontSize: 16, color: "#FFFFFF" },
  resendButton: { minHeight: 44, marginTop: 12, alignItems: "center", justifyContent: "center" },
  resendText: { fontFamily: "Manrope-Medium", fontSize: 13, color: colors.primary },
});