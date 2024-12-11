// LoginContainer Component

// Asset Imports
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { Title } from "./Title";
import { CustomButton } from "./Button";
import { Input } from "./Input";
import { SecureInput } from "./SecureInput";
import { useRouter } from "expo-router";

// Returns a LoginContainer Component
export function LoginContainer() {
  // Define Hook
  const router = useRouter();

  const handleLogin = () => {
    router.push("/screens/homeScreen");
  }

  return (
    <View
      style={styles.container}
    >
      <Title></Title>
      <Input title="Username" placeholder="Kash"></Input>
      <SecureInput title="Password" placeholder=""></SecureInput>
      <View>
        <CustomButton label="Login" color="#0255EE" onPress={handleLogin}/>
        <TouchableOpacity onPress={() => router.push("https://trove-capstone.vercel.app/")}>
          <View style={styles.hintContainer}>
            <Text style={styles.hint}>
              Don't have an account?
            </Text>
            <Text style={styles.hintRed}>
              Sign up now!  
            </Text> 
          </View>
        </TouchableOpacity>
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
    width: '85%',
    elevation: 5,
  },
  hintContainer: {
    justifyContent: 'center',
    flexDirection: 'row',
    paddingTop: 20,
  },
  hint: {
    color: '#6C6F6F',
    marginRight: 5,
  },
  hintRed: {
    color: '#4E88F4',
    fontWeight: 'bold',
  }
});

