import Feather from '@expo/vector-icons/Feather';
import { type ComponentProps, type ReactNode, useState } from 'react';
import { StyleSheet, Text, TextInput, type TextInputProps, TouchableOpacity, View } from 'react-native';

type AuthFieldProps = Omit<TextInputProps, 'style' | 'secureTextEntry'> & {
  label: string;
  icon: ComponentProps<typeof Feather>['name'];
  password?: boolean;
  helperText?: string;
  error?: string;
  labelAction?: ReactNode;
};

export function AuthField({
  label,
  icon,
  password = false,
  helperText,
  error,
  labelAction,
  ...inputProps
}: AuthFieldProps) {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [focused, setFocused] = useState(false);

  return (
    <View style={styles.field}>
      <View style={styles.labelRow}>
        <Text style={styles.label}>{label}</Text>
        {labelAction}
      </View>
      <View style={[styles.inputContainer, focused && styles.focusedInput, Boolean(error) && styles.invalidInput]}>
        <Feather name={icon} size={20} color="#67828B" />
        <TextInput
          {...inputProps}
          accessibilityLabel={inputProps.accessibilityLabel ?? label}
          accessibilityHint={error ?? helperText}
          style={styles.input}
          placeholderTextColor="#8A9EA6"
          selectionColor="#009B90"
          secureTextEntry={password && !passwordVisible}
          onFocus={(event) => {
            setFocused(true);
            inputProps.onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            inputProps.onBlur?.(event);
          }}
        />
        {password && (
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setPasswordVisible((visible) => !visible)}
            accessibilityRole="button"
            accessibilityLabel={`${passwordVisible ? 'Hide' : 'Show'} ${label.toLowerCase()}`}
            style={styles.visibilityButton}
          >
            <Feather name={passwordVisible ? 'eye-off' : 'eye'} size={20} color="#67828B" />
          </TouchableOpacity>
        )}
      </View>
      {helperText && <Text style={styles.helperText}>{helperText}</Text>}
      {error && <Text accessibilityLiveRegion="polite" style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    gap: 6,
  },

  labelRow: {
    minHeight: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  label: {
    fontFamily: 'Manrope-SemiBold',
    fontSize: 13,
    lineHeight: 20,
    color: '#182B36',
  },

  inputContainer: {
    minHeight: 48,
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 16,
    paddingRight: 4,
    gap: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0F3EC',
    backgroundColor: '#E9F9F3',
    experimental_backgroundImage: 'linear-gradient(100deg, #E6F8F1 0%, #ECFAF5 100%)',
  },

  focusedInput: {
    borderColor: '#0D9488',
  },

  invalidInput: {
    borderColor: '#DC6B6B',
  },

  input: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 12,
    paddingHorizontal: 0,
    fontFamily: 'Manrope-Regular',
    fontSize: 15,
    lineHeight: 22,
    color: '#24404A',
  },

  visibilityButton: {
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },

  helperText: {
    marginTop: 2,
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 17,
    color: '#7B899B',
  },

  error: {
    fontFamily: 'Manrope-Regular',
    fontSize: 12,
    lineHeight: 18,
    color: '#B84242',
  },
});
