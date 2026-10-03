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

type ResetPasswordScreenProps = {
  loading: boolean;
  error: string | null;
  onSubmit: (password: string) => void | Promise<void>;
  onBack: () => void;
};

export function ResetPasswordScreen({ loading, error, onSubmit, onBack }: ResetPasswordScreenProps) {
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmationError, setConfirmationError] = useState("");
  const submittingRef = useRef(false);

  const submit = async () => {
    if (loading || submittingRef.current) return;
    const valid = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9\s]).{8,}$/.test(password);
    setPasswordError(valid ? "" : "Use 8 or more characters with uppercase, lowercase, a number, and a symbol.");
    setConfirmationError(password === confirmation && confirmation ? "" : "Your passwords don’t match.");
    if (!valid || password !== confirmation || !confirmation) return;
    Keyboard.dismiss();
    submittingRef.current = true;
    try {
      await onSubmit(password);
    } finally {
      submittingRef.current = false;
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === "ios" ? "padding" : "height"}>
        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.screen}>
            <TouchableOpacity accessibilityRole="button" accessibilityLabel="Go back" disabled={loading} onPress={onBack} style={styles.backButton}>
              <Feather name="chevron-left" size={27} color="#142C30" />
            </TouchableOpacity>
            <View style={styles.content}>
              <View style={styles.iconContainer}><Feather name="lock" size={30} color={colors.primary} /></View>
              <Text accessibilityRole="header" style={styles.title}>Create a new password</Text>
              <Text style={styles.description}>Choose a new password for your VitaQera account.</Text>
              <View style={styles.form}>
                <AuthField
                  label="New password"
                  icon="lock"
                  password
                  placeholder="Enter new password"
                  value={password}
                  onChangeText={(value) => { setPassword(value); setPasswordError(""); }}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  helperText="Use at least 8 characters with uppercase, lowercase, number, and symbol."
                  error={passwordError || undefined}
                />
                <AuthField
                  label="Confirm password"
                  icon="shield"
                  password
                  placeholder="Re-enter new password"
                  value={confirmation}
                  onChangeText={(value) => { setConfirmation(value); setConfirmationError(""); }}
                  autoComplete="new-password"
                  textContentType="newPassword"
                  autoCapitalize="none"
                  autoCorrect={false}
                  editable={!loading}
                  returnKeyType="go"
                  onSubmitEditing={submit}
                  error={confirmationError || undefined}
                />
                {!!error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
                <TouchableOpacity
                  accessibilityRole="button"
                  accessibilityState={{ disabled: loading, busy: loading }}
                  disabled={loading}
                  onPress={submit}
                  style={[styles.button, loading && styles.disabledButton]}
                >
                  {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Update Password</Text>}
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