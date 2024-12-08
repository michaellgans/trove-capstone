import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { Text } from "react-native";

export default function RootLayout() {
  return (
    <>
      <StatusBar style="light" backgroundColor="#000000" />
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}
