import { Redirect } from "expo-router";
import { useAuth } from "@clerk/expo";
import { ActivityIndicator, View } from "react-native";

export default function SSOCallback() {
  const { isLoaded, isSignedIn } = useAuth();

  if (!isLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  if (isSignedIn) {
    return <Redirect href="/onboarding" />;
  }

  return <Redirect href="/get-started" />;
}