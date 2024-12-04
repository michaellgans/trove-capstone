// Imports
import { Text, type TextProps, StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';

import { useThemeColor } from '@/hooks/useThemeColor';
import { Colors } from 'react-native/Libraries/NewAppScreen';

// Props
export type ThemedTextProps = TextProps & {
  lightColor?: string;
  darkColor?: string;
  type?: 'default' | 'title' | 'defaultSemiBold' | 'subtitle' | 'link';
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
  // Logo Text
  title: {
    fontSize: 60,
    fontFamily: 'BaskervilleSC',
  },
  // Slogan Text
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Main Text
  default: {
    fontSize: 16,
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  // Main Text semibold
  defaultBold: {
    fontSize: 16,
    fontWeight: 'semibold',
    lineHeight: 20,
    fontFamily: 'Inter',
  },
  // Input Text
  prompts: {
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
  // Displays balance
  balanceText: {
    fontSize: 30,
    fontWeight: 'semibold',
  },
  // Learning Center
  sectionText: {
    fontSize: 48,
    fontWeight: 'bold',
  },
  // Settings and Notifications
  subSectionText: {
    fontSize: 24,
    fontWeight: 'semibold',
  },
  // Dropdowns
  dropdownText: {
    fontSize: 18,
    fontWeight: 'medium',
  },
  // Hints
  hintText: {
    fontSize: 14,
    fontWeight: 'medium',
  }
});
