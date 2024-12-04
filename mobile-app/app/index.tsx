import { CustomButton } from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet, Image } from "react-native";
import { useFonts } from "expo-font";

export default function Index() {
  // Hooks
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'BaskervilleSC': require('../assets/fonts/BaskervvilleSC-Regular.ttf'),
    'BaskervilleSmall': require('../assets/fonts/Baskervville-Regular.ttf')
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
      {/* Login Container */}
      <View style={styles.container}>
        <Text style={styles.title}>Trove</Text>
        <Text style={styles.slogan}>Let's learn together.</Text>
        <CustomButton label="Login" color="#0255EE"/>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "#000000",
    fontSize: 24,
    fontWeight: "bold",
  },
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
  // Title and Logo
  title: {
    fontSize: 61,
    fontFamily: 'BaskervilleSC',
    color: '#090A05',
  },
  slogan: {
    fontSize: 30,
    fontFamily: 'BaskervilleSmall',
    color: '#090A05',
  },
});