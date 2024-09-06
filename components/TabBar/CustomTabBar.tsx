import { useAppStore } from "@/store/app";
import { MotiView } from "moti";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { useTheme } from "react-native-paper";
import { type BottomTabBarProps } from "@react-navigation/bottom-tabs";

export default function CustomAnimatedTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const isTabBarVisible = useAppStore((state) => state.isTabbarVisible);
  const theme = useTheme();
  return (
    <MotiView
      from={{ translateY: 0 }}
      animate={{ translateY: isTabBarVisible ? 0 : 100 }}
      transition={{ type: "timing", duration: 300 }}
      style={[
        styles.tabBarContainer,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.elevation.level5,
        },
      ]}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const primary = theme.colors.primary;
        const Icon = options.tabBarIcon;

        return (
          <TouchableOpacity
            key={route.key}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            style={{
              flex: 1,
              alignItems: "center",
              justifyContent: "center",
              gap: 5,
            }}
          >
            <View
              style={{
                padding: 8,
                borderRadius: 10,
                backgroundColor: isFocused ? primary : undefined,
                borderWidth: 1,
                borderColor: theme.colors.elevation.level0,
              }}
            >
              {Icon ? (
                <Icon
                  focused
                  color={
                    isFocused ? theme.colors.surface : theme.colors.onBackground
                  }
                  size={24}
                />
              ) : null}
            </View>
          </TouchableOpacity>
        );
      })}
    </MotiView>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 30,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    flexDirection: "row",
    borderWidth: 0.5,
  },
});
