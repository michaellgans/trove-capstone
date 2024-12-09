// Home Screen
import { View, Image, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import { UserPhoto } from "@/components/UserPhoto";
import { BalanceCard } from "@/components/BalanceCard";

export default function HomeScreen() {
  return (
    <LinearGradient
      colors={["rgba(2, 85, 238, 0.30)", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.background}
    >
      <View style={styles.banner}>
      </View>
      <View style={styles.cardsContainer}>
        <BalanceCard accountBalance={100.00} accountName="Checking" />
        <BalanceCard accountBalance={100.00} accountName="Checking" />
        <BalanceCard accountBalance={100.00} accountName="Checking" />
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
    zIndex: 1,
    height: "80%",
    width: "100%",
    backgroundColor: "#4E88F4",
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
  },
  cardsContainer: {
    zIndex: 2,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  userIcon: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginBottom: -150,
  },
});

