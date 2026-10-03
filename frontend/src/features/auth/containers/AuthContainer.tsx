import { useAuth, useSignIn, useSignUp } from "@clerk/expo";
import { useRouter } from "expo-router";
import { useEffect, useRef, useState } from "react";

import { AuthScreen, type AuthFormValues } from "../screens/AuthScreen";
import { ForgotPasswordEmailScreen } from "../screens/ForgotPasswordEmailScreen";
import { ForgotPasswordOtpScreen } from "../screens/ForgotPasswordOtpScreen";
import { ResetPasswordScreen } from "../screens/ResetPasswordScreen";

type AuthFlow = "auth" | "forgot-email" | "forgot-otp" | "forgot-new-password";
type ClerkResultError = { code?: string; message?: string; errors?: { code?: string }[] };

const clerkErrorCode = (error: ClerkResultError) => error.errors?.[0]?.code ?? error.code;

export function AuthContainer() {
  const { signIn } = useSignIn();
  const { signUp } = useSignUp();
  const { isLoaded, isSignedIn } = useAuth();
  const router = useRouter();
  const [awaitingSession, setAwaitingSession] = useState(false);

  useEffect(() => {
    if (isLoaded && isSignedIn && awaitingSession) {
      router.replace("/onboarding");
    }
  }, [isLoaded, isSignedIn, awaitingSession, router]);

  const [flow, setFlow] = useState<AuthFlow>("auth");
  const [resetEmail, setResetEmail] = useState("");
  const [forgotLoading, setForgotLoading] = useState(false);
  const [forgotError, setForgotError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const forgotBusy = useRef(false);

  const leaveForgotPassword = () => {
    setFlow("auth");
    setResetEmail("");
    setForgotError(null);
  };

  const handleForgotPassword = (email: string) => {
    setResetEmail(email);
    setSuccessMessage(null);
    setForgotError(null);
    setFlow("forgot-email");
  };

  const handleSendResetCode = async (email: string) => {
    if (forgotBusy.current) return;
    forgotBusy.current = true;
    setForgotLoading(true);
    setForgotError(null);
    try {
      const { error: createError } = await signIn.create({ identifier: email });
      if (createError) {
        if (__DEV__) console.warn("[Auth] Password reset attempt rejected:", clerkErrorCode(createError));
        setForgotError("Unable to send a reset code. Check the email and try again.");
        return;
      }
      const { error: sendError } = await signIn.resetPasswordEmailCode.sendCode();
      if (sendError) {
        if (__DEV__) console.warn("[Auth] Password reset code send rejected:", clerkErrorCode(sendError));
        setForgotError("Unable to send a reset code. Please try again.");
        return;
      }
      setResetEmail(email);
      setFlow("forgot-otp");
    } catch {
      setForgotError("Unable to send a reset code. Please check your connection and try again.");
    } finally {
      forgotBusy.current = false;
      setForgotLoading(false);
    }
  };

  const handleResendResetCode = async () => {
    if (forgotBusy.current) return false;
    forgotBusy.current = true;
    setForgotLoading(true);
    setForgotError(null);
    try {
      const { error } = await signIn.resetPasswordEmailCode.sendCode();
      if (error) {
        if (__DEV__) console.warn("[Auth] Password reset code resend rejected:", clerkErrorCode(error));
        setForgotError("Unable to resend the code. Please try again.");
        return false;
      }
      return true;
    } catch {
      setForgotError("Unable to resend the code. Please check your connection and try again.");
      return false;
    } finally {
      forgotBusy.current = false;
      setForgotLoading(false);
    }
  };

  const handleVerifyResetCode = async (code: string) => {
    if (forgotBusy.current) return;
    forgotBusy.current = true;
    setForgotLoading(true);
    setForgotError(null);
    try {
      const { error } = await signIn.resetPasswordEmailCode.verifyCode({ code });
      if (error) {
        if (__DEV__) console.warn("[Auth] Password reset code rejected:", clerkErrorCode(error));
        setForgotError("Invalid or expired code. Check the code and try again.");
        return;
      }
      if (signIn.status !== "needs_new_password") {
        setForgotError("Unable to continue the reset. Please request a new code.");
        return;
      }
      setFlow("forgot-new-password");
    } catch {
      setForgotError("Unable to verify the code. Please check your connection and try again.");
    } finally {
      forgotBusy.current = false;
      setForgotLoading(false);
    }
  };

  const handleUpdatePassword = async (password: string) => {
    if (forgotBusy.current) return;
    forgotBusy.current = true;
    setForgotLoading(true);
    setForgotError(null);
    try {
      const { error } = await signIn.resetPasswordEmailCode.submitPassword({ password });
      if (error) {
        const code = clerkErrorCode(error);
        if (__DEV__) console.warn("[Auth] Password update rejected:", code);
        setForgotError(code === "form_password_pwned" || code === "form_password_compromised"
          ? "This password is known to be unsafe. Choose a different one."
          : code?.startsWith("form_password")
            ? error.message ?? "This password doesn't meet the current requirements."
            : "Unable to update your password. Please try again.");
        return;
      }
      if (signIn.status !== "complete") {
        setForgotError("Additional verification is required. Please start the reset again.");
        return;
      }
      const { error: resetError } = await signIn.reset();
      if (resetError) {
        setForgotError("Password updated, but we couldn't return to sign in. Please try again.");
        return;
      }
      leaveForgotPassword();
      setSuccessMessage("Password updated. You can now sign in.");
    } catch {
      setForgotError("Unable to update your password. Please check your connection and try again.");
    } finally {
      forgotBusy.current = false;
      setForgotLoading(false);
    }
  };

  const handleSignIn = async (values: AuthFormValues) => {
    if (!isLoaded) throw new Error("Authentication is still loading. Please try again.");
    if (isSignedIn) {
      router.replace("/onboarding");
      return;
    }
    let result;
    try {
      result = await signIn.password({ emailAddress: values.email.trim(), password: values.password });
    } catch {
      throw new Error("Unable to sign in. Please check your connection and try again.");
    }
    if (result.error) {
      if (__DEV__) console.warn("[Auth] Sign-in rejected:", clerkErrorCode(result.error));
      throw new Error("Invalid email or password. Please try again.");
    }
    if (signIn.status !== "complete") {
      if (__DEV__) console.warn("[Auth] Additional sign-in step required:", signIn.status);
      throw new Error("Additional verification is required to sign in.");
    }
    try {
      const { error } = await signIn.finalize();
      if (error) {
        if (__DEV__) console.warn("[Auth] Sign-in finalization rejected:", clerkErrorCode(error));
        throw new Error("Unable to complete sign in. Please try again.");
      }
    } catch {
      throw new Error("Unable to complete sign in. Please try again.");
    }
    setAwaitingSession(true);
  };

  const handleSignUp = async (values: AuthFormValues) => {
    if (!isLoaded) throw new Error("Authentication is still loading. Please try again.");
    if (isSignedIn) {
      router.replace("/onboarding");
      return;
    }
    let result;
    try {
      result = await signUp.password({ emailAddress: values.email.trim(), password: values.password });
    } catch {
      throw new Error("Unable to create your account. Please check your connection and try again.");
    }
    if (result.error) {
      const code = clerkErrorCode(result.error);
      if (__DEV__) console.warn("[Auth] Sign-up rejected:", code);
      if (code === "form_identifier_exists" || code === "form_email_address_exists" || code === "form_identifier_already_exists") {
        throw new Error("Unable to create an account with this email. Try signing in instead.");
      }
      if (code === "form_password_pwned" || code === "form_password_compromised") {
        throw new Error("This password is known to be unsafe. Choose a different one.");
      }
      if (code?.startsWith("form_password")) {
        throw new Error(result.error.message ?? "This password doesn't meet the current requirements. Please try another one.");
      }
      throw new Error("Unable to create your account. Please try again.");
    }
    if (signUp.status !== "complete") {
      if (__DEV__) console.warn("[Auth] Sign-up incomplete; check Clerk email verification settings:", signUp.status);
      throw new Error("Account setup needs another step. Please contact support.");
    }
    try {
      const { error } = await signUp.finalize();
      if (error) {
        if (__DEV__) console.warn("[Auth] Sign-up finalization rejected:", clerkErrorCode(error));
        throw new Error("Unable to finish creating your account. Please try again.");
      }
    } catch {
      throw new Error("Unable to finish creating your account. Please try again.");
    }
    setAwaitingSession(true);
  };

  if (!isLoaded || awaitingSession) return null;

  if (flow === "forgot-email") {
    return (
      <ForgotPasswordEmailScreen
        initialEmail={resetEmail}
        loading={forgotLoading}
        error={forgotError}
        onSend={handleSendResetCode}
        onBack={leaveForgotPassword}
      />
    );
  }

  if (flow === "forgot-otp") {
    return (
      <ForgotPasswordOtpScreen
        email={resetEmail}
        loading={forgotLoading}
        error={forgotError}
        onVerify={handleVerifyResetCode}
        onResend={handleResendResetCode}
        onBack={() => {
          setForgotError(null);
          setFlow("forgot-email");
        }}
      />
    );
  }

  if (flow === "forgot-new-password") {
    return (
      <ResetPasswordScreen
        loading={forgotLoading}
        error={forgotError}
        onSubmit={handleUpdatePassword}
        onBack={() => {
          setForgotError(null);
          setFlow("forgot-email");
        }}
      />
    );
  }

  return <AuthScreen onSignIn={handleSignIn} onSignUp={handleSignUp} onForgotPassword={handleForgotPassword} successMessage={successMessage} />;
}
