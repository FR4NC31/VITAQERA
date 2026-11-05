export const colors = {
  primary: {
    50: '#EAF4FF',
    100: '#CDE5FF',
    200: '#8FC7FF',
    400: '#4DA6F5',
    500: '#208AEF',
    600: '#1674D1',
    700: '#125BA5',
    900: '#103B66',
  },

  neutral: {
    0: '#FFFFFF',
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0',
    300: '#CBD5E1',
    400: '#94A3B8',
    500: '#64748B',
    600: '#475569',
    700: '#334155',
    800: '#1E293B',
    900: '#0F172A',
  },

  semantic: {
    success: '#16A34A',
    warning: '#D97706',
    error: '#DC2626',
    info: '#0284C7',
  },

  nutrition: {
    protein: '#208AEF',
    carbs: '#F59E0B',
    fat: '#8B5CF6',
    water: '#16A34A',
  },
} as const;

export const typography = {
  fonts: {
    heading: {
      regular: 'Sora-Regular',
      medium: 'Sora-Medium',
      semiBold: 'Sora-SemiBold',
      bold: 'Sora-Bold',
      extraBold: 'Sora-ExtraBold',
    },
    body: {
      regular: 'Manrope-Regular',
      medium: 'Manrope-Medium',
      semiBold: 'Manrope-SemiBold',
      bold: 'Manrope-Bold',
      extraBold: 'Manrope-ExtraBold',
    },
  },

  weights: {
    regular: '400',
    medium: '500',
    semiBold: '600',
    bold: '700',
    extraBold: '800',
  },

  sizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
  },
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  '2xl': 24,
  '3xl': 32,
  '4xl': 40,
  '5xl': 48,
  '6xl': 64,
} as const;

export const radius = {
  sm: 6,
  md: 10,
  lg: 16,
  xl: 20,
  '2xl': 24,
  full: 9999,
} as const;

export const shadows = {
  sm: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  md: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 3,
  },
  lg: {
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.12,
    shadowRadius: 12,
    elevation: 6,
  },
} as const;

export const lightTheme = {
  background: colors.neutral[50],
  surface: colors.neutral[0],
  surfaceSecondary: colors.neutral[100],

  textPrimary: colors.neutral[900],
  textSecondary: colors.neutral[500],

  border: colors.neutral[200],

  primary: colors.primary[600],
  primaryForeground: colors.neutral[0],
} as const;

export const theme = {
  colors,
  typography,
  spacing,
  radius,
  shadows,
  light: lightTheme,
} as const;

export type Theme = typeof theme;
