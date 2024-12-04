import { CustomButton } from "@/components/Button";
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";
import { useFonts } from "expo-font";

export default function Index() {
  // Hooks
  const [fontsLoaded] = useFonts({
    'Inter': require('../assets/fonts/Inter-VariableFont_opsz,wght.ttf'),
    'Baskerville': require('../assets/fonts/BaskervvilleSC-Regular.ttf'),
  })

  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "rgba(2, 85, 238, 0.30)"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Gradient Background!</Text>
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
});