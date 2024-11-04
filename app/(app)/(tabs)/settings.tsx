import ListItem from "@/components/Settings/components/ListItems";
import Profile from "@/components/Settings/components/Profile";
import { View } from "@/components/Themed";
import { useSession } from "@/ctx";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import AppDialog from "@/ui/app-dialog";
import CustomIcon, { IconName, TIconLibrary } from "@/ui/custom-icon";
import { useHeaderHeight } from "@react-navigation/elements";
import { Href } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { ScrollView, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface SettingsItem {
  icon: IconName;
  path?: Href<string>;
  label: string;
  library?: TIconLibrary;
}
const SETTINGS_LIST: SettingsItem[] = [
  {
    library: "ionic",
    icon: "calendar-clear",
    path: "/(app)/settings/annual-leave",
    label: "Employee Leave Balances",
  },
  {
    library: "ionic",
    icon: "calendar-number",
    path: "/(app)/settings/leave-type",
    label: "Leave type",
  },
  {
    library: "ionic",
    icon: "shield",
    path: "/settings/security",
    label: "Security",
  },
  {
    library: "ionic",
    icon: "color-palette",
    path: "/settings/theme-settings",
    label: "Light/Dark theme",
  },
  {
    library: "ionic",
    icon: "log-out",
    label: "Logout",
  },
];

export default function SettingsScreen() {
  const height = useHeaderHeight();
  const router = useExpoRouter();
  const { signOut } = useSession();
  const { state: isLogoutDialogVisible, toggle: toggleLogoutDialog } =
    useVisibility({ defaultVisiblityState: false });
  const theme = useTheme();

  const onConfirmLogout = () => {
    signOut();
    toggleLogoutDialog();
    router.replace("(auth)/login");
  };
  return (
    <View style={[styles.container, { paddingTop: height, paddingBottom: 85 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile />
        <View style={{ marginTop: 30, flex: 1, rowGap: 10 }}>
          {SETTINGS_LIST.map((props, _index) => (
            <ListItem
              key={_index}
              {...props}
              toggleLogoutDialog={toggleLogoutDialog}
            />
          ))}
        </View>
      </ScrollView>
      <AppDialog
        onCancel={toggleLogoutDialog}
        cancelText="No"
        content={
          <View
            style={{
              backgroundColor: theme.colors.surface,
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: theme.colors.errorContainer,
                borderRadius: 22,
                padding: 15,
                height: 100,
                width: 100,
                alignItems: "center",
              }}
            >
              <CustomIcon
                style={{ marginRight: -15 }}
                size={64}
                name="log-out-outline"
                color={theme.colors.error}
                library="ionic"
              />
            </View>

            <Text
              variant="titleLarge"
              style={{
                paddingTop: 15,
                fontFamily: "Poppins_500Medium",
              }}
            >
              Are you sure to logout?
            </Text>
          </View>
        }
        confirmText="Yes"
        visible={isLogoutDialogVisible}
        onConfirm={onConfirmLogout}
        children
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    gap: 10,
  },
});
