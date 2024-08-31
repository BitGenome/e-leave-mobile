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
    </Stack>
  );
}
