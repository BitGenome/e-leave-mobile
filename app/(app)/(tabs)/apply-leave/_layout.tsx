import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { Stack } from "expo-router";
import React from "react";
import { useTheme } from "react-native-paper";

export default function ApplyLeaveLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "center",
        headerTitle: () => (
          <TextPoppinsBold>Apply Employee Leave</TextPoppinsBold>
        ),
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
