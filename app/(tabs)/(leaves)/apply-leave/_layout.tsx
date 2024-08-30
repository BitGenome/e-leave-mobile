import React from "react";
import { Stack } from "expo-router";

export default function ApplyLeaveLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, headerShadowVisible: false }}>
      <Stack.Screen name="index" />
    </Stack>
  );
}
