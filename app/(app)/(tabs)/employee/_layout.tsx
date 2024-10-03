import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import CustomIcon from "@/ui/custom-icon";
import { Stack, useRouter } from "expo-router";
import React from "react";
import { IconButton, useTheme } from "react-native-paper";

export default function EmployeeLayout() {
  const theme = useTheme();
  const router = useRouter();
  return (
    <Stack
      screenOptions={{
        headerRight: () => (
          <IconButton
            onPress={() => router.navigate("/(app)/(employee)/search-employee")}
            icon={() => <CustomIcon name="search" library="ionic" />}
          />
        ),
        headerShown: true,
        headerShadowVisible: false,
        headerTitleAlign: "left",
        headerTitle: () => <TextPoppinsBold>My Employees</TextPoppinsBold>,
        headerStyle: {
          backgroundColor: theme.colors.surface,
        },
      }}
    >
      <Stack.Screen name="index" />
    </Stack>
  );
}
