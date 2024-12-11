// UserPhotoSmall Component

// Asset Imports
import { Image, StyleSheet, ImageSourcePropType } from "react-native";

// Types
type UserPhotoSmallProps = {
  source: ImageSourcePropType;
};

// Returns a UserPhotoSmall Component
export function UserPhotoSmall({ source }: UserPhotoSmallProps) {
    // Define Hook
    return (
      <Image
        style={styles.image}
        source={source}
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

