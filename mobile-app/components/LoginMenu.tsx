// Login Menu Component
import { LinearGradient } from "expo-linear-gradient";
import { Text, View, StyleSheet } from "react-native";

export default function LoginMenu() {
  return (
    <View style={styles.container}>
        <Text style={styles.text}>Gradient Background!</Text>
    </View>
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