// Tab Navigation

// Imports
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Icon Imports
import { HomeIcon } from "@/components/icons/HomeIcon";
import { LearningIcon } from "@/components/icons/LearningIcon";
import { NotificationIcon } from "@/components/icons/NotificationIcon";
import { SendTransactionIcon } from "@/components/icons/SendTransactionIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";

// Screen Imports
import HomeScreen from "../(tabs)";
import LearningCenterScreen from "../(tabs)/learningCenter";
import NewTransactionScreen from "../(tabs)/newTransaction";
import NotificationsScreen from "../(tabs)/notifications";
import SettingsScreen from "../(tabs)/settings";

const Tab = createBottomTabNavigator();

export default function TabsNavigator() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: () => {
                    if (route.name === "Home") {
                        return <HomeIcon />
                    } else if (route.name === "Learning Center") {
                        return <LearningIcon />
                    } else if (route.name === "New Transaction") {
                        return <SendTransactionIcon />
                    } else if (route.name === "Notifications") {
                        return <NotificationIcon />
                    } else if (route.name === "Settings") {
                        return <SettingsIcon />
                    } 
                },
                headerShown: false,
            })}
        >
            <Tab.Screen name="Home" component={HomeScreen}></Tab.Screen>
            <Tab.Screen name="Learning Center" component={LearningCenterScreen}></Tab.Screen>
            <Tab.Screen name="New Transactions" component={NewTransactionScreen}></Tab.Screen>
            <Tab.Screen name="Notifications" component={NotificationsScreen}></Tab.Screen>
            <Tab.Screen name="Settings" component={SettingsScreen}></Tab.Screen>
        </Tab.Navigator>
    );
}

