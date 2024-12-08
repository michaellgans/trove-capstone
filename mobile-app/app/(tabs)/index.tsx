// Home Screen

// Import
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";

export default function HomeScreen() {
  // Hooks
  const [fontsLoaded] = useFonts({
    'Inter': require('../../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'BaskervilleSC': require('../../assets/fonts/BaskervvilleSC-Regular.ttf'),
    'BaskervilleSmall': require('../../assets/fonts/Baskervville-Regular.ttf')
  })
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "rgba(2, 85, 238, 0.30)"]}
      style={styles.background}
    >
      {/* Banner */}
      <View
        style={styles.banner}>
        <Image
            source={require('@/assets/images/LoginBanner.png')}
            style={styles.bannerImage}
        />
      </View>
      <Text>This is the Home Screen</Text>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignContent: 'center',
//     alignItems: 'center'
//   },
  banner: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 298,
    zIndex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
});