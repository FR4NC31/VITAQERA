import { useClerk } from '@clerk/expo'
import { useRouter } from 'expo-router'
import { useState } from 'react'
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

import { colors } from '@/theme/theme'

export function OnboardingScreen() {
  const { signOut } = useClerk()
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogout = async () => {
    if (loading) return
    setLoading(true)
    setError('')
    try {
      await signOut()
      router.replace('/get-started')
    } catch {
      setError('Unable to log out. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.content}>
        <Text style={styles.title}>OnboardingScreen</Text>
        {error ? <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text> : null}
        <TouchableOpacity
          accessibilityRole="button"
          accessibilityState={{ disabled: loading, busy: loading }}
          disabled={loading}
          onPress={handleLogout}
          style={[styles.button, loading && styles.disabledButton]}
        >
          {loading ? <ActivityIndicator color="#FFFFFF" /> : <Text style={styles.buttonText}>Log out</Text>}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: '#F8FCFB' },
  content: { flex: 1, width: '100%', maxWidth: 480, alignSelf: 'center', justifyContent: 'center', paddingHorizontal: 20, gap: 20 },
  title: { fontFamily: 'Fraunces-SemiBold', fontSize: 30, color: '#10201D', textAlign: 'center' },
  error: { fontFamily: 'Manrope-Regular', fontSize: 13, color: '#B84242', textAlign: 'center' },
  button: { minHeight: 56, borderRadius: 18, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.primary },
  disabledButton: { opacity: 0.6 },
  buttonText: { fontFamily: 'Manrope-SemiBold', fontSize: 16, color: '#FFFFFF' },
})