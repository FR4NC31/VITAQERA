import Feather from "@expo/vector-icons/Feather";
import { useRef, useState } from "react";
import {
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors } from "@/theme/theme";
import { AuthField } from "../components/AuthField";

type ForgotPasswordEmailScreenProps = {
  initialEmail: string;
  loading: boolean;
  error: string | null;
  onSend: (email: string) => void | Promise<void>;
  onBack: () => void;
};

export function ForgotPasswordEmailScreen({
  initialEmail,
  loading,
  error,
  onSend,
  onBack,
}: ForgotPasswordEmailScreenProps) {
  const [email, setEmail] = useState(initialEmail);
  const [emailError, setEmailError] = useState("");
  const submittingRef = useRef(false);

  const submit = async () => {
    if (loading || submittingRef.current) return;
    const address = email.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(address)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    Keyboard.dismiss();
    submittingRef.current = true;
    try {
      await onSend(address);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.screen}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" disabled={loading} onPress={onBack} style={styles.backButton}>
              <Feather name="chevron-left" size={27} color="#142C30" />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.iconContainer}>
                <Feather name="mail" size={30} color={colors.primary} />
              </View>
              <Text accessibilityRole="header" style={styles.title}>Forgot your password?</Text>
              <Text style={styles.description}>Enter the email linked to your VitaQera account.</Text>
              <View style={styles.form}>
                <AuthField
                  label="Email address"
                  icon="mail"
                  placeholder="name@example.com"
                  value={email}
                  onChangeText={(value) => { setEmail(value); setEmailError(""); }}
                  keyboardType="email-address"
                  autoComplete="email"
                  textContentType="emailAddress"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="send"
                  onSubmitEditing={submit}
                  error={emailError || undefined}
                />
                {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={{ disabled: loading, busy: loading }}
                  disabled={loading}
                  onPress={submit}
                  style={[styles.button, loading && styles.disabledButton]}
                >
                  {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Send Code</Text>}
                </TouchableOpacity>
              </View>
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
  title: { fontFamily: "Fraunces-SemiBold", fontSize: 30, lineHeight: 40, color: "#10201D", textAlign: "center" },
  description: { marginTop: 10, maxWidth: 320, fontFamily: "Manrope-Regular", fontSize: 15, lineHeight: 22, color: "#657C89", textAlign: "center" },
  form: { width: "100%", marginTop: 32, gap: 16 },
  error: { fontFamily: "Manrope-Regular", fontSize: 13, lineHeight: 20, color: "#B84242" },
  button: { minHeight: 56, alignItems: "center", justifyContent: "center", borderRadius: 18, backgroundColor: colors.primary },
  disabledButton: { opacity: 0.6 },
  buttonText: { fontFamily: "Manrope-SemiBold", fontSize: 16, color: "#FFFFFF" },
});