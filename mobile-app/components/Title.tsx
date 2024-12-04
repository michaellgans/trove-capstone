// Title Component

// Asset Imports
import { Text, View, Image, StyleSheet } from "react-native";

// Returns a Title Component
export function Title() {
    // Define Hook
    return (
      // Title and Logo
      <View style={styles.container}>
        <View style={styles.innerContainer}>
          <Image
              source={require('@/assets/images/Logo.png')}
              style={styles.logoImage}
          />
          <Text style={styles.title}>Trove</Text>
        </View>
        <Text style={styles.slogan}>Let's learn together.</Text>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
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
  logoImage: {
    
  },
});
