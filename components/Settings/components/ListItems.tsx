import CustomIcon, { type IconName } from "@/ui/custom-icon";
import { AntDesign } from "@expo/vector-icons";
import { Href } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { StyleSheet, View, ViewProps } from "react-native";
import {
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

interface ItemProps extends ViewProps {
  label: string;
  path?: Href<string>;
  icon?: IconName;
  library?: "antdesign" | "ionic";
  toggleLogoutDialog?: () => void;
}

export default function ListItem(props: ItemProps) {
  const theme = useTheme();
  const { icon, library: iconLibrary, path, label, toggleLogoutDialog } = props;
  const router = useExpoRouter();
  const IS_LOGOUT_ITEM = label === "Logout";

  const onPressItem = () => {
    if (IS_LOGOUT_ITEM && toggleLogoutDialog) return toggleLogoutDialog();
    if (path) return router.navigate(path);

    return;
  };
  return (
    <TouchableRipple
      borderless
      style={{
        borderRadius: 15,
      }}
      rippleColor={theme.colors.primary}
      onPress={onPressItem}
    >
      <View
        style={[
          props.style,
          styles.container,
          { backgroundColor: theme.colors.surface },
        ]}
        {...props}
      >
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            gap: 7,
          }}
        >
          {icon && (
            <CustomIcon
              library={iconLibrary}
              name={icon}
              size={24}
              color={IS_LOGOUT_ITEM ? theme.colors.error : theme.colors.primary}
            />
          )}

          <Text
            style={[
              styles.label,
              {
                color: IS_LOGOUT_ITEM
                  ? theme.colors.error
                  : theme.colors.onSurface,
              },
            ]}
          >
            {label}
          </Text>
        </View>
        <IconButton
          icon={() => (
            <AntDesign name="right" color={theme.colors.secondary} size={24} />
          )}
        />
      </View>
    </TouchableRipple>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    borderRadius: 15,
    height: 70,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontWeight: "semibold",
  },
});
