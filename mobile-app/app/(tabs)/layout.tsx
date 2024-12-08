// Layout for Mobile App

// Imports
import React from "react";
import TabsNavigator from "../navigation/TabsNavigator";

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            {children}
            <TabsNavigator />
        </>
    );
}
