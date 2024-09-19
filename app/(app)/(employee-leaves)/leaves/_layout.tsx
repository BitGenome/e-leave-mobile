import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function LeavesLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: true,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen name="[id]" />
      <Stack.Screen
        name="leave-details/[id]"
        options={{
          title: "Leave details",
          headerTitle: () => <NavigationHeaderTitle title="Leave details" />,
        }}
      />
    </Stack>
  );
}
