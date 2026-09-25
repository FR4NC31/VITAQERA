import { Stack } from "expo-router";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [fontsLoaded, fontError] = useFonts({
    "Fraunces-SemiBold": require("@/assets/fonts/fraunces/Fraunces_72pt-SemiBold.ttf"),
    "Fraunces-Bold": require("@/assets/fonts/fraunces/Fraunces_72pt-Bold.ttf"),

    "Manrope-Regular": require("@/assets/fonts/manrope/Manrope-Regular.ttf"),
    "Manrope-Medium": require("@/assets/fonts/manrope/Manrope-Medium.ttf"),
    "Manrope-SemiBold": require("@/assets/fonts/manrope/Manrope-SemiBold.ttf"),
    "Manrope-Bold": require("@/assets/fonts/manrope/Manrope-Bold.ttf"),
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded, fontError]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  if(fontError) {
    throw fontError
  }

  return <Stack screenOptions={{ headerShown: false }} />;
}