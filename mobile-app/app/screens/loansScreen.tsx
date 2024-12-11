// loansScreen Component

// Asset Imports
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserPhoto } from "@/components/UserPhoto";
import { BalanceCard } from "@/components/BalanceCard";
import { TransactionCard } from "@/components/LoansTransaction";

// Returns a loansScreen Component
export default function loansScreen() {
  // Define Hook
  return (
    <LinearGradient
      colors={["rgba(249, 87, 48, 0.40)", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.background}
    >
      <View style={styles.banner}>
      </View>
      <View style={styles.cardsContainer}>
        <BalanceCard accountBalance={20.00} accountName="Loans" color="#CA1401" />
        <TransactionCard themeColor="#CA1401" buttonLabel="Send Loan" />
      </View>
      <View style={styles.userIcon}>
          <UserPhoto />
      </View>
    </LinearGradient>
  );
}
  
const styles = StyleSheet.create({
  background: {
    flex: 1,
    flexDirection: "column-reverse",
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  banner: {
    height: "80%",
    width: "100%",
    backgroundColor: "#F76745",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
  },
  cardsContainer: {
    position: "absolute",
    top: 255, 
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  userIcon: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 40,
  },
});
  