// Layout for Screens
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View, StyleSheet } from "react-native";

// Icons
import { HomeIcon } from "@/components/icons/HomeIcon";
import { LearningIcon } from "@/components/icons/LearningIcon";
import { SendTransactionIcon } from "@/components/icons/SendTransactionIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";

export default function ScreensLayout() {
  return (
    <View style={styles.container}>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack screenOptions={{ headerShown: false }} />
      <View style={styles.tabsContainer}>
        <HomeIcon />
        <LearningIcon />
        <View style={styles.sendIcon}>
          <SendTransactionIcon />
        </View>
        <NotificationIcon />
        <SettingsIcon />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  tabsContainer: {
    flexDirection: "row",
    height: 60,
    width: "100%",
    paddingBottom: 20,
    paddingTop: 5,
    paddingHorizontal: 20,
    justifyContent: "space-around",
    backgroundColor: "#FFFFFF",
  },
  sendIcon: {
    height: 75,
    width: 75,
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
    marginTop: -25,
    paddingLeft: 8,
    paddingBottom: 5,
    backgroundColor: "#6C6F6F",
    borderRadius: 100,
    borderColor: "#FFFFFF",
    borderWidth: 5,
  },
  });