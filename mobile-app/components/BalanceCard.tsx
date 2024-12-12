// BalanceCard Component

// Asset Imports
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { CheckingIcon } from "./icons/CheckingIcon";
import { SavingsIcon } from "./icons/SavingsIcon";
import { LoansIcon } from "./icons/LoansIcon";

// Types
type BalanceCardProps = {
    accountName: string;
    accountBalance: number;
    color: string;
};

// Returns a BalanceCard Component
export function BalanceCard({accountBalance, accountName, color}: BalanceCardProps) {
    // Define Hook
    const handleAccountIcon = () => {
      switch (accountName) {
        case "Checking":
          return <CheckingIcon />;
        case "Savings":
          return <SavingsIcon />;
        case "Loans":
          return <LoansIcon />;
        default:
          return null;
      }
    };

    return (
      <View style={styles.container}>
        <View style={styles.infoContainer}>
          <Text style={styles.accountName}>
            {accountName}
          </Text>
          <Text style={styles.accountBalance}>
            ${accountBalance.toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity style={[styles.accountIcon, { backgroundColor: color }]}>
          {handleAccountIcon()}
        </TouchableOpacity>
      </View>
    );
}

const styles = StyleSheet.create({
  accountName: {
    fontSize: 20,
    fontFamily: "Inter",
    color: "#6C6F6F",
  },
  accountBalance: {
    fontSize: 30,
    fontWeight: "bold",
    fontFamily: "Inter",
    color: "black",
  },
  accountIcon: {
    height: 75,
    width: 75,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#0255EE",
    borderRadius: 100,
  },
  container: {
    width: "90%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 40,
    paddingHorizontal: 20,
    paddingVertical: 15,
    margin: 10,
    marginVertical: 15,
    elevation: 7,
  },
  infoContainer: {
    flexDirection: "column",
    width: "50%",
  }
});

