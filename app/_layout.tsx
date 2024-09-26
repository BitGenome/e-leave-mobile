import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import { useAppThemeStore } from "@/store/app";
import { darkTheme, lightTheme } from "@/themes";
import {
  Poppins_100Thin,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
  Poppins_800ExtraBold,
  Poppins_900Black,
} from "@expo-google-fonts/poppins";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { BottomSheetModalProvider } from "@gorhom/bottom-sheet";
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import merge from "deepmerge";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { adaptNavigationTheme, Provider, useTheme } from "react-native-paper";
import { TabsProvider } from "react-native-paper-tabs";
import "react-native-reanimated";
export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";
import { enGB, registerTranslation } from "react-native-paper-dates";
import { useMigrations } from "drizzle-orm/expo-sqlite/migrator";
import migrations from "../drizzle/migrations";
import { db } from "@/api/database/database";
import { useDrizzleStudio } from "expo-drizzle-studio-plugin";
import * as SQLite from "expo-sqlite";

const dbExpo = SQLite.openDatabaseSync("leavease.db");
registerTranslation("en-GB", enGB);

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: "(app)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    Poppins_400Regular,
    Poppins_100Thin,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
    Poppins_800ExtraBold,
    Poppins_900Black,
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const customDarkTheme = { ...darkTheme, colors: Colors.dark };
const customLightTheme = { ...lightTheme, colors: Colors.light };

const { LightTheme, DarkTheme } = adaptNavigationTheme({
  reactNavigationLight: NavigationDefaultTheme,
  reactNavigationDark: NavigationDarkTheme,
});

const CombinedLightTheme = merge(LightTheme, customLightTheme);
const CombinedDarkTheme = merge(DarkTheme, customDarkTheme);

function RootLayoutNav() {
  const theme = useTheme();
  /**
   * check this url for morre info https://github.com/drizzle-team/drizzle-orm/discussions/2447
   */
  useDrizzleStudio(dbExpo);
  return (
    <Providers>
      <Stack
        screenOptions={{
          headerShadowVisible: false,
          headerShown: false,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
        }}
      >
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </Providers>
  );
}

function Providers({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme();
  const { isDarkTheme, loadTheme } = useAppThemeStore();
  const { success, error } = useMigrations(db, migrations);

  useEffect(() => {
    loadTheme();
  }, [loadTheme]);

  const theme =
    isDarkTheme || colorScheme === "dark"
      ? CombinedDarkTheme
      : CombinedLightTheme;

  if (success) console.log("success migration");

  if (error) console.warn("error", error);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider theme={theme}>
        <ThemeProvider value={theme}>
          <TabsProvider>
            <BottomSheetModalProvider>{children}</BottomSheetModalProvider>
          </TabsProvider>
        </ThemeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}
