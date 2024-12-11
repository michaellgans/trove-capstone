// TransactionCard Component

// Asset Imports
import { Text, View, StyleSheet } from "react-native";
import { UserPhotoSmall } from "./UserPhotoSmall";
import { ArrowIcon } from "./icons/ArrowIcon";
import { CustomButton } from "./Button";
import { Input } from "./Input";
import { FinancialInput } from "./FinancialInput";

// Script Imports

// Returns a TransactionCard Component
export function TransactionCard() {
  // Define Hook
  return (
    <View
      style={styles.container}
    >
      {/* User Icon, Arrow, User Icon */}
      <View
        style={styles.transfer}
      >
        <UserPhotoSmall source={require("../assets/images/avatarSmall.png")} />
        <View
          style={styles.icon}
        >
          <ArrowIcon />
        </View>
        <UserPhotoSmall source={require("../assets/images/avatarSmall2.png")} />
      </View>
      <FinancialInput symbol="$" type="USD" />
      <CustomButton label="Send Money" color="#0255EE" />
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

