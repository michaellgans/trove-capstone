// New Transaction Screen
import { View, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserPhoto } from "@/components/UserPhoto";
import { TransactionCard } from "@/components/CheckingTransaction";

export default function NewTransactionScreen() {
  return (
    <LinearGradient
      colors={["rgba(2, 85, 238, 0.30)", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.background}
    >
      <View style={styles.banner}>
      </View>
      <View style={styles.cardsContainer}>
        <TransactionCard themeColor="#0255EE" buttonLabel="Send Money" />
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
    backgroundColor: "#4E88F4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    position: "absolute",
    bottom: 0,
  },
  cardsContainer: {
    position: "absolute",
    top: 275, 
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
