// Notifications Screen
import { View, Text, StyleSheet } from "react-native";

export default function NotificationsScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Welcome to the Notifications Screen!</Text>
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

