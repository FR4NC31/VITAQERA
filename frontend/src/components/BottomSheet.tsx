import { type PropsWithChildren, type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import {
  Animated,
  KeyboardAvoidingView,
  Modal,
  PanResponder,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  type StyleProp,
  Text,
  View,
  type ViewStyle,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { colors, radius, spacing } from "@/theme/theme";

export type BottomSheetProps = PropsWithChildren<{
  visible: boolean;
  onClose: () => void;
  /** Use "auto" to fit the content, a percentage, or a height in logical pixels. */
  height?: number | `${number}%` | "auto";
  maxHeight?: number | `${number}%`;
  title?: string;
  description?: string;
  /** A custom header replaces the title and description. */
  header?: ReactNode;
  /** Remains visible below the scrolling content. */
  footer?: ReactNode;
  /** Decorative content rendered behind the handle and scrolling content. */
  background?: ReactNode;
  /** Disable when children manage scrolling, such as FlatList or SectionList. */
  scrollable?: boolean;
  /** Controls user dismissal through the backdrop, handle, accessibility, and Android back. */
  dismissible?: boolean;
  dismissOnBackdropPress?: boolean;
  enableSwipeDismiss?: boolean;
  showHandle?: boolean;
  accessibilityLabel?: string;
  sheetStyle?: StyleProp<ViewStyle>;
  contentContainerStyle?: StyleProp<ViewStyle>;
}>;

export function BottomSheet({
  visible,
  onClose,
  height = "66%",
  maxHeight = "90%",
  title,
  description,
  header,
  footer,
  background,
  scrollable = true,
  dismissible = true,
  dismissOnBackdropPress = true,
  enableSwipeDismiss = true,
  showHandle = true,
  accessibilityLabel = title ?? "Bottom sheet",
  sheetStyle,
  contentContainerStyle,
  children,
}: BottomSheetProps) {
  const insets = useSafeAreaInsets();
  const [translateY] = useState(() => new Animated.Value(0));
  const autoHeight = height === "auto";
  const hasHeader = header != null || Boolean(title || description);
  const requestClose = useCallback(() => {
    if (dismissible) onClose();
  }, [dismissible, onClose]);

  useEffect(() => {
    translateY.stopAnimation();
    translateY.setValue(0);
    return () => translateY.stopAnimation();
  }, [visible, translateY]);

  // Only the handle captures dragging, so content can scroll independently.
  const panResponder = useMemo(() => PanResponder.create({
    onMoveShouldSetPanResponder: (_, gesture) => dismissible && enableSwipeDismiss && gesture.dy > 6 && Math.abs(gesture.dy) > Math.abs(gesture.dx),
    onPanResponderMove: (_, gesture) => translateY.setValue(Math.max(0, gesture.dy)),
    onPanResponderRelease: (_, gesture) => {
      if (dismissible && enableSwipeDismiss && (gesture.dy > 80 || (gesture.dy > 20 && gesture.vy > 0.8))) {
        requestClose();
      } else {
        Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
      }
    },
    onPanResponderTerminate: () => {
      Animated.spring(translateY, { toValue: 0, useNativeDriver: true }).start();
    },
  }), [dismissible, enableSwipeDismiss, requestClose, translateY]);

  const contentStyle = [
    styles.content,
    autoHeight && styles.autoContent,
  ];
  const contentPadding = [
    styles.contentContainer,
    !showHandle && !hasHeader && styles.contentWithoutHeader,
    contentContainerStyle,
  ];

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={requestClose}
      statusBarTranslucent
      navigationBarTranslucent
    >
      <View style={styles.overlay}>
        <Pressable
          style={styles.backdrop}
          onPress={dismissOnBackdropPress ? requestClose : undefined}
          accessible={false}
        />
        <KeyboardAvoidingView
          style={[styles.keyboardContainer, {
            paddingTop: insets.top + spacing[4],
          }]}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          pointerEvents="box-none"
        >
          <Animated.View
            style={[
              styles.sheet,
              sheetStyle,
              {
                height: autoHeight ? undefined : height,
                maxHeight,
                paddingBottom: Math.max(insets.bottom, spacing[4]),
                transform: [
                  {
                    translateY,
                  },
                ],
              },
            ]}
            accessibilityViewIsModal
            accessibilityLabel={accessibilityLabel}
            onAccessibilityEscape={requestClose}
          >
            {background != null && (
              <View
                style={StyleSheet.absoluteFill}
                pointerEvents="none"
                accessibilityElementsHidden
                importantForAccessibility="no-hide-descendants"
              >
                {background}
              </View>
            )}
            {showHandle && (
              <View {...panResponder.panHandlers}>
                <Pressable
                  accessible={dismissible}
                  disabled={!dismissible}
                  accessibilityRole="button"
                  accessibilityLabel="Close sheet"
                  accessibilityHint={enableSwipeDismiss ? "Tap or swipe down to dismiss" : "Tap to dismiss"}
                  onPress={requestClose}
                  style={styles.handleTarget}
                >
                  <View style={styles.handle} />
                </Pressable>
              </View>
            )}
            {hasHeader && (
              <View style={[styles.header, !showHandle && styles.headerWithoutHandle]}>
                {header ?? (
                  <>
                    {title && <Text accessibilityRole="header" style={styles.title}>{title}</Text>}
                    {description && <Text style={styles.description}>{description}</Text>}
                  </>
                )}
              </View>
            )}
            {scrollable ? (
              <ScrollView
                style={contentStyle}
                contentContainerStyle={contentPadding}
                keyboardShouldPersistTaps="handled"
                keyboardDismissMode="on-drag"
                showsVerticalScrollIndicator={false}
              >
                {children}
              </ScrollView>
            ) : (
              <View style={[contentStyle, ...contentPadding, autoHeight && styles.autoContent]}>{children}</View>
            )}
            {footer != null && (
              <View style={styles.footer}>{footer}</View>
            )}
          </Animated.View>
        </KeyboardAvoidingView>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
  },

  keyboardContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },

  backdrop: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(16, 32, 29, 0.55)',
  },

  sheet: {
    width: '100%',
    maxWidth: 480,
    borderTopLeftRadius: spacing[8],
    borderTopRightRadius: spacing[8],
    backgroundColor: colors.surface,
    overflow: 'hidden',
  },

  handleTarget: {
    height: 44,
    alignItems: 'center',
    paddingTop: spacing[3],
    touchAction: 'none',
  },

  handle: {
    width: 44,
    height: 5,
    borderRadius: radius.full,
    backgroundColor: colors.borderStrong,
  },

  header: {
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[4],
    gap: spacing[2],
  },

  headerWithoutHandle: {
    paddingTop: spacing[6],
  },

  title: {
    fontFamily: 'Fraunces-SemiBold',
    fontSize: 26,
    lineHeight: 34,
    color: colors.textPrimary,
  },

  description: {
    fontFamily: 'Manrope-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: colors.textSecondary,
  },

  content: {
    flex: 1,
    minHeight: 0,
  },

  autoContent: {
    flexGrow: 0,
    flexShrink: 1,
    flexBasis: 'auto',
  },

  contentContainer: {
    flexGrow: 1,
    paddingHorizontal: spacing[6],
    paddingBottom: spacing[4],
  },

  contentWithoutHeader: {
    paddingTop: spacing[6],
  },

  footer: {
    paddingHorizontal: spacing[6],
    paddingTop: spacing[4],
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.borderSubtle,
  },
});
