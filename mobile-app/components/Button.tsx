// Button Component

// Asset Imports
import { TouchableOpacity } from "react-native";
import { Text, StyleSheet } from "react-native";

// Script Imports

// Types
type ButtonProps = {
    label: string;
    color: string;
};

// Returns a Button Component
export function CustomButton({label, color}: ButtonProps) {
    // Define Hook
    return (
      <TouchableOpacity
        style={[styles.button, {backgroundColor: color}]}
      >
        <Text
          style={[styles.buttonText]}  
        >
          {label}
        </Text>
      </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 260,
    height: 62,
    paddingVertical: 10, 
    paddingHorizontal: 18,
    margin: 10,
    borderRadius: 100,
  },
  buttonText: {
    fontSize: 20,
    lineHeight: 24,
    color: '#FFFFFF',
    fontFamily: 'Inter',
    fontWeight: 'bold',
  },
});

