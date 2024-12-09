import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text, View, StyleSheet } from "react-native";

// Icons
import { HomeIcon } from "@/components/icons/HomeIcon";
import { LearningIcon } from "@/components/icons/LearningIcon";
import { SendTransactionIcon } from "@/components/icons/SendTransactionIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";

export default function ScreensLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack screenOptions={{ headerShown: false }} />
      <View style={styles.tabsContainer}>
        <HomeIcon />
        <LearningIcon />
        <SendTransactionIcon />
        <NotificationIcon />
        <SettingsIcon />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
    tabsContainer: {
        flexDirection: "row",
        height: 60,
        width: "100%",
        paddingBottom: 20,
        paddingTop: 5,
        paddingHorizontal: 20,
        justifyContent: "space-around",
        backgroundColor: "#FFFFFF",
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    }
  });