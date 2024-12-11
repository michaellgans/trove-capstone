// UserPhotoSmall Component

// Asset Imports
import { Image, StyleSheet, ImageSourcePropType } from "react-native";

// Types
type UserPhotoSmallProps = {
  source: ImageSourcePropType;
  themeColor: string;
};

// Returns a UserPhotoSmall Component
export function UserPhotoSmall({ source, themeColor }: UserPhotoSmallProps) {
    // Define Hook
    return (
      <Image
        style={[styles.image, {borderColor: themeColor}]}
        source={source}
      ></Image>
    );
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    width: 100,
    borderWidth: 3,
    borderRadius: 100,
  },
});

