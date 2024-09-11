import { TabBarIcon } from "@/app/(tabs)/_layout";
import { AntDesign, Ionicons } from "@expo/vector-icons";
import { Href } from "expo-router";
import { StyleSheet, View, ViewProps } from "react-native";
import {
  IconButton,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

interface ItemProps extends ViewProps {
  label: string;
  path: Href<string>;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
}

export default function ListItem(props: ItemProps) {
  const theme = useTheme();
  const { icon } = props;
  return (
    <TouchableRipple
      borderless
      style={{
        borderRadius: 15,
      }}
      rippleColor={theme.colors.primary}
      onPress={() => console.log("df")}
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
          <Ionicons
            name="color-palette"
            size={24}
            color={theme.colors.primary}
          />

          <Text style={styles.label}>{props.label}</Text>
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
