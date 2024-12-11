// UserPhotoSmall Component

// Asset Imports
import { Image, StyleSheet } from "react-native";

// Returns a UserPhotoSmall Component
export function UserPhotoSmall() {
    // Define Hook
    return (
      <Image
        style={styles.image}
        source={require("../assets/images/avatarSmall.png")}
      ></Image>
    );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderColor: "#0255EE",
    borderWidth: 3,
    borderRadius: 100,
  },
});

