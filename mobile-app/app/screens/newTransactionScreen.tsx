// New Transaction Screen
import { View, Text, StyleSheet } from "react-native";

export default function NewTransactionScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the New Transaction Screen!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

