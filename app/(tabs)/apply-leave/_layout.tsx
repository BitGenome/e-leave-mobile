import React from "react";
import { Stack } from "expo-router";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";

export default function ApplyLeaveLayout() {
  return (
    <Stack screenOptions={{ headerShadowVisible: false }}>
      <Stack.Screen
        name="index"
        options={{
          headerShown: true,
          title: "Apply leave",
          headerTitleAlign: "center",
          headerTitle: () => <TextPoppinsBold>Apply leave</TextPoppinsBold>,
        }}
      />
    </Stack>
  );
}
