import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { UserPhotoSmall } from "./UserPhotoSmall";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CustomButton } from "./Button";
import { FinancialInput } from "./FinancialInput";
import RNPickerSelect from "react-native-picker-select";

// Types
type TransactionCardProps = {
  themeColor: string;
  buttonLabel: string;
};

// Returns a TransactionCard Component
export function TransactionCard({ themeColor, buttonLabel }: TransactionCardProps) {
  // State for the dropdown
  const [selectedValue, setSelectedValue] = React.useState<string | null>(null);

  const handleValueChange = (value: string | null) => {
    setSelectedValue(value);
  };

  return (
    <View style={styles.container}>
      {/* User Icon, Arrow, User Icon */}
      <View style={styles.transfer}>
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/avatarSmall.png")} />
        <View style={styles.icon}>
          <ArrowIcon />
        </View>
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/avatarSmall2.png")} />
      </View>

      <FinancialInput symbol="$" type="USD" />

      <RNPickerSelect
        onValueChange={handleValueChange}
        items={[
          { label: "5% - Your loan is due in 1 week.", value: "" },
          { label: "10% - Your loan is due in 2 weeks.", value: "" },
          { label: "20% - Your loan is due in 1 month.", value: "" },
        ]}
        placeholder={{
          label: "Select an Interest Rate...",
          value: null,
        }}
        style={{
          inputAndroid: {
            height: 55,
            width: "100%",
            borderWidth: 1,
            paddingBottom: 5,
            borderRadius: 4,
            borderColor: "#000",
          },
        }}
      />

      <CustomButton label={buttonLabel} color={themeColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    elevation: 7,
    padding: 20,
  },
  icon: {
    paddingHorizontal: 8,
  },
  transfer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
