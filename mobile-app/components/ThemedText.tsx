// Imports
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Props
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'title' | 'subtitle' | 'default' | 'defaultMedium' | 'defaultBold' | 'mutedText' | 'buttonText' | 'balanceTitle' | 'balanceText' | 'sectionText' | 'subSectionText' | 'dropdownText' | 'hintText';
};

export function ThemedText({
  style,
  lightColor,
  darkColor,
  type = 'default',
  ...rest
}: ThemedTextProps) {
  // Uses basic text color
  const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

  // Use downloaded fonts
  const [loaded] = useFonts({
    BaskervilleSC: require('../assets/fonts/BaskervvilleSC-Regular.ttf'),
    Baskerville: require('../assets/fonts/LibreBaskerville-Regular.ttf'),
    Inter: require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
  });

  return (
    <Text
      style={[
        { color },
        styles[type],
        // type === 'default' ? styles.default : undefined,
        // type === 'title' ? styles.title : undefined,
        // type === 'defaultSemiBold' ? styles.defaultSemiBold : undefined,
        // type === 'subtitle' ? styles.subtitle : undefined,
        // type === 'link' ? styles.link : undefined,
        style,
      ]}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  // Login: title
  title: {
    fontSize: 60,
    fontFamily: 'BaskervilleSC',
  },
  // Login: subtitle
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    fontFamily: 'Baskerville',
  },
  // Notification text
  default: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  // Login: input titles
  defaultMedium: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'medium',
    fontFamily: 'Inter',
  },
  // Notification Subject:
  // Main Text semibold
  defaultBold: {
    fontSize: 16,
    lineHeight: 20,
    fontWeight: 'semibold',
    fontFamily: 'Inter',
  },
  // Login: Input Placeholder
  // Muted Text
  mutedText: {
    fontSize: 16,
    lineHeight: 24,
    fontFamily: 'Inter',
    color: Colors.light.mutedText
  },
  // Buttons
  buttonText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
  },
  // Home, Checking, Savings, Loans:
  // Titles of Balance
  // Savings Goals, Loan Progress
  balanceTitle: {
    fontSize: 20,
    fontFamily: 'Inter',
    color: Colors.light.mutedText
  },
  // Home, Checking, Savings, Loans:
  // Balances
  balanceText: {
    fontSize: 30,
    fontWeight: 'semibold',
  },
  // Learning Center: Title
  sectionText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  // Settings, Sent, Notifications: Title
  subSectionText: {
    fontSize: 24,
    fontWeight: 'semibold',
  },
  // Settings: Dropdowns
  dropdownText: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  // Settings: Hints
  hintText: {
    fontSize: 14,
    fontWeight: 'medium',
  }
});
