import ListItem from "@/components/Settings/components/ListItems";
import Profile from "@/components/Settings/components/Profile";
import { View } from "@/components/Themed";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import AppDialog from "@/ui/app-dialog";
import CustomIcon, { IconName, TIconLibrary } from "@/ui/custom-icon";
import { useHeaderHeight } from "@react-navigation/elements";
import { Href } from "expo-router";
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
  const { state: isLogoutDialogVisible, toggle: toggleLogoutDialog } =
    useVisibility({ defaultVisiblityState: false });
  const theme = useTheme();

  return (
    <View style={[styles.container, { paddingTop: height + 20 }]}>
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
                backgroundColor: theme.colors.primaryContainer,
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
                color={theme.colors.secondary}
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
        onConfirm={toggleLogoutDialog}
        children
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 10,
  },
});
