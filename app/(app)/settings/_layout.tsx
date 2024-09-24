import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function SettingsLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        headerShadowVisible: false,
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen
        name="security"
        options={{
          headerShown: true,
          headerTransparent: true,
          headerTitle: () => <NavigationHeaderTitle title="Security" />,
        }}
      />
      <Stack.Screen
        name="theme-settings"
        options={{
          headerShown: true,
          headerTitle: () => <NavigationHeaderTitle title="Theme" />,
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: () => <NavigationHeaderTitle title="Edit Profile" />,
        }}
      />
    </Stack>
  );
}
