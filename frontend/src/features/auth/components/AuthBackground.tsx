import { Image } from 'expo-image';
import { StyleSheet, View } from 'react-native';

export function AuthBackground() {
  return (
    <View
      style={styles.background}
      pointerEvents="none"
      accessibilityElementsHidden
      importantForAccessibility="no-hide-descendants"
    >
      <View style={styles.topWash} />
      <View style={styles.leftWash} />
      <View style={styles.bottomWave} />
      <View style={styles.bottomHighlight} />
      <Image
        source={require('@/assets/images/GetStarted/leaves-right.png')}
        contentFit="contain"
        tintColor="#A7DECE"
        style={styles.leavesRight}
      />
      <Image
        source={require('@/assets/images/GetStarted/leaves-left.png')}
        contentFit="contain"
        tintColor="#A7DECE"
        style={styles.leavesLeft}
      />
      <Image
        source={require('@/assets/images/GetStarted/leaves-right.png')}
        contentFit="contain"
        tintColor="#8ED6C0"
        style={styles.leavesBottom}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    ...StyleSheet.absoluteFill,
    overflow: 'hidden',
  },

  topWash: {
    position: 'absolute',
    top: -110,
    left: -100,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: '#E9FAF4',
    opacity: 0.6,
  },

  leftWash: {
    position: 'absolute',
    top: '24%',
    left: -120,
    width: 170,
    height: 380,
    borderRadius: 100,
    backgroundColor: '#DDF7EE',
    opacity: 0.45,
    transform: [
      {
        rotate: '28deg',
      },
    ],
  },

  bottomWave: {
    position: 'absolute',
    bottom: -165,
    right: -160,
    width: 480,
    height: 235,
    borderRadius: 180,
    backgroundColor: '#C9EBE0',
    transform: [
      {
        rotate: '-28deg',
      },
    ],
  },

  bottomHighlight: {
    position: 'absolute',
    bottom: -145,
    left: -95,
    width: 400,
    height: 220,
    borderRadius: 180,
    backgroundColor: '#DFF8EF',
    opacity: 0.7,
  },

  leavesRight: {
    position: 'absolute',
    top: 52,
    right: -36,
    width: 115,
    height: 190,
    opacity: 0.35,
    transform: [
      {
        rotate: '-26deg',
      },
    ],
  },

  leavesLeft: {
    position: 'absolute',
    top: 154,
    left: -48,
    width: 123,
    height: 150,
    opacity: 0.4,
    transform: [
      {
        rotate: '30deg',
      },
    ],
  },

  leavesBottom: {
    position: 'absolute',
    bottom: -28,
    left: -48,
    width: 150,
    height: 180,
    opacity: 0.45,
    transform: [
      {
        rotate: '-30deg',
      },
    ],
  },
});
