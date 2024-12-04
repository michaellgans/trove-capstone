import { View, Image, StyleSheet, Platform } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';

export default function Login() {
  return (
    <View
      style={[styles.background]}>
      <ThemedText type="title">Welcome!</ThemedText>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#FFFFFF',
  }
});
