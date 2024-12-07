// Input Component

// Asset Imports
import { useState } from "react";
import { Text, View, TextInput, StyleSheet } from "react-native";

// Types
type InputProps = {
    title: string;
    placeholder: string;
};

// Returns a Input Component
export function Input({title, placeholder}: InputProps) {
    // Define Hook
    const [text, setText] = useState('');

    return (
      <View
        style={styles.container}
      >
        <Text
          style={styles.title}
        >
          {title}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={text}
          onChangeText={(value) => setText(value)}
        >
        </TextInput>
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    width: '90%',
    justifyContent: 'center',
    alignContent: 'center',
  },
  title: {
    fontSize: 16,
    fontFamily: 'Inter',
    lineHeight: 20,
    marginBottom: 5,
    color: '#090A05',
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#090A05',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
});

