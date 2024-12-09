// UserPhoto Component

// Asset Imports
import { Image, StyleSheet } from "react-native";

// Returns a UserPhoto Component
export function UserPhoto() {
    // Define Hook
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/userPhoto.png")}
      ></Image>
    );
}

const styles = StyleSheet.create({
  image: {
    height: 200,
    width: 200,
  },
});

