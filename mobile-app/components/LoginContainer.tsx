// LoginContainer Component

// Asset Imports
import { Text, View, StyleSheet } from "react-native";
import { Title } from "./Title";
import { CustomButton } from "./Button";
import { Input } from "./Input";
import { SecureInput } from "./SecureInput";
import { Link } from "expo-router";

// Returns a LoginContainer Component
export function LoginContainer() {
  // Define Hook
  return (
    <View
      style={styles.container}
    >
      <Title></Title>
      <Input title="Username" placeholder="Kash"></Input>
      <SecureInput title="Password" placeholder=""></SecureInput>
      <View>
        <Link href="/(tabs)" asChild>
          <CustomButton label="Login" color="#0255EE"/>
        </Link>
        <Text style={styles.hint}>
          Don't have an account?  Sign up now!
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    zIndex: 2,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 60,
    paddingHorizontal: 10,
    paddingVertical: 20,
    borderWidth: 1,
    borderColor: '#6C6F6F',
    width: '85%'
  },
  hint: {
    color: '#6C6F6F',
    textAlign: 'center'    
  }
});

