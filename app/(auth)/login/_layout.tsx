import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import { Stack } from "expo-router";
import { useTheme } from "react-native-paper";

export default function LoginLayout() {
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
        name="index"
        options={{
          headerShown: false,
          headerTransparent: true,
          headerTitle: () => <NavigationHeaderTitle title="Login" />,
        }}
      />
    </Stack>
  );
}
