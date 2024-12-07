// LoginContainer Component

// Asset Imports
import { View, StyleSheet } from "react-native";
import { Title } from "./Title";
import { CustomButton } from "./Button";

// Returns a LoginContainer Component
export function LoginContainer() {
  // Define Hook
  return (
    <View
      style={styles.container}
    >
      <Title></Title>
      <CustomButton label="Login " color="#0255EE"/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    alignItems: "center",
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#6C6F6F',
    width: '85%'
  },
});

