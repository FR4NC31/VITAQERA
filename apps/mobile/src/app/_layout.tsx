/* eslint-disable @typescript-eslint/no-require-imports */
import { Stack } from 'expo-router';
import { useFonts } from 'expo-font';
import { ActivityIndicator, View } from 'react-native';

export default function RootLayout() {
  const [fontsLoaded] = useFonts({
    'Sora-Regular': require('@assets/fonts/Sora-Regular.ttf'),
    'Sora-Medium': require('@assets/fonts/Sora-Medium.ttf'),
    'Sora-SemiBold': require('@assets/fonts/Sora-SemiBold.ttf'),
    'Sora-Bold': require('@assets/fonts/Sora-Bold.ttf'),
    'Sora-ExtraBold': require('@assets/fonts/Sora-ExtraBold.ttf'),

    'Manrope-Regular': require('@assets/fonts/Manrope-Regular.ttf'),
    'Manrope-Medium': require('@assets/fonts/Manrope-Medium.ttf'),
    'Manrope-SemiBold': require('@assets/fonts/Manrope-SemiBold.ttf'),
    'Manrope-Bold': require('@assets/fonts/Manrope-Bold.ttf'),
    'Manrope-ExtraBold': require('@assets/fonts/Manrope-ExtraBold.ttf'),
  });

  if (!fontsLoaded) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ActivityIndicator />
      </View>
    );
  }

  return <Stack />;
}
