import { CenteredView } from "@/components/Common/CenteredView";
import { useSession } from "@/ctx";
import { Redirect, Stack } from "expo-router";
import { ActivityIndicator, useTheme } from "react-native-paper";

export default function AppsLayout() {
  const theme = useTheme();
  const { session, isLoading } = useSession();

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (isLoading)
    return (
      <CenteredView>
        <ActivityIndicator />
      </CenteredView>
    );

  if (!session) {
    // On web, static rendering will stop here as the user is not authenticated
    // in the headless Node process that the pages are rendered in.
    return <Redirect href="/login" />;
  }
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
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}
