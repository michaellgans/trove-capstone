// Login Menu Component
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";

export default function Index() {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "rgba(2, 85, 238, 0.30)"]}
      style={styles.background}
    >
      <View style={styles.container}>
        <Text style={styles.text}>Gradient Background!</Text>
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