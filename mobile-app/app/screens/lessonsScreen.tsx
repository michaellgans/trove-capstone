// Lessons Screen
import { View, Text, Image, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { UserPhoto } from "@/components/UserPhoto";
import { BalanceCard } from "@/components/BalanceCard";
import { Keywords } from "@/components/Keywords";

export default function LessonsScreen() {
  return (
    <LinearGradient
      colors={["#FFFFFF", "#FFFFFF", "#FFFFFF", "#FFFFFF", "rgba(249, 200, 47, 0.30)" ]}
      style={styles.background}
    >
      {/* Banner */}
      <View
        style={styles.banner}>
        <Image
            source={require('@/assets/images/lessonsBanner.png')}
            style={styles.bannerImage}
        />
      </View>
      <View
        style={styles.kashContainer}>
        <Image 
          source={require('@/assets/images/kashFlyingLessons.png')}
        />
      </View>
      <View style={styles.cardsContainer}>
        <Keywords />
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
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 298,
    zIndex: 1,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
  },
  cardsContainer: {
    position: "absolute",
    top: 400, 
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    borderWidth: 1,
  },
  kashContainer: {
    zIndex: 2,
    position: "absolute",
    top: 55,
  },
});
