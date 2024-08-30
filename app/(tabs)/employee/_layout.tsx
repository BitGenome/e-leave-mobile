import { View } from "@/components/Themed";
import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

export default function EmployeeLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerTitleAlign: "center",
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen
        name="register-employee"
        options={{
          title: "Register Employee",
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="employee-detail"
        options={{
          headerTitle: "Employee Detail",
          headerShown: true,
        }}
      />
    </Stack>
  );
}
