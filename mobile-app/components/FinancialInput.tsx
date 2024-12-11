// FinancialInput Component

// Asset Imports
import { Text, View, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Svg, { Path } from "react-native-svg";

// Types
type FinancialInputProps = {
  symbol: string;
  type: string;
};

// Returns a FinancialInput Component
export function FinancialInput({symbol, type}: FinancialInputProps) {
  // Define Hook
  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text>{symbol}</Text>
        <TextInput
          style={styles.input}
          placeholder="0.00"
          keyboardType="numeric"
        />       
      </View>
      <TouchableOpacity style={styles.currencyDropdown}>
        <Text>{type}</Text>
        <Svg width="20" height="20" viewBox="0 0 20 20" fill="none">
          <Path d="M5 7.5L10 12.5L15 7.5" stroke="#6C6F6F" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        </Svg>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: "space-between",
    alignContent: 'center',
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: "#C8C3BB",
    borderRadius: 8,
    paddingHorizontal: 8,
    marginTop: 16,
    marginBottom: 8,
  },
  currencyDropdown: {
    flexDirection: 'row',
    height: 30,
    alignContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: 200,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    margin: 0,
    padding: 0,
    height: 50,
  },
});

