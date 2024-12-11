// Notifications Screen
import { View, Text, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserPhoto } from "@/components/UserPhoto";
import { BalanceCard } from "@/components/BalanceCard";

export default function NotificationsScreen() {
  return (
    <LinearGradient
      colors={["rgba(249, 200, 47, 0.50)", "#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF"]}
      style={styles.background}
    >
      <View style={styles.banner}>
      </View>
      <View style={styles.cardsContainer}>
        <Text>Notifications Coming Soon!</Text>
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
    backgroundColor: "#F7D365",
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
