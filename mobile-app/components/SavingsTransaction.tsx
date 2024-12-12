// TransactionCard Component

// Asset Imports
import { View, StyleSheet } from "react-native";
import { UserPhotoSmall } from "./UserPhotoSmall";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CustomButton } from "./Button";
import { FinancialInput } from "./FinancialInput";

// Script Imports

// Types
type TransactionCardProps = {
  themeColor: string;
  buttonLabel: string;
};

// Returns a TransactionCard Component
export function TransactionCard({themeColor, buttonLabel}: TransactionCardProps) {
  // Define Hook
  return (
    <View
      style={styles.container}
    >
      {/* User Icon, Arrow, User Icon */}
      <View
        style={styles.transfer}
      >
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/checkingAvatar.png")} />
        <View
          style={styles.icon}
        >
          <ArrowIcon />
        </View>
        <UserPhotoSmall themeColor={themeColor} source={require("../assets/images/savingsAvatar.png")} />
      </View>
      <FinancialInput symbol="$" type="USD" />
      <CustomButton label={buttonLabel} color={themeColor} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "90%",
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 40,
    elevation: 7,
    padding: 20,
  },
  icon: {
    paddingHorizontal: 8,
  },
  transfer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

