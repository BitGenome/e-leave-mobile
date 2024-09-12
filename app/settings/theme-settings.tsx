import { View } from "@/components/Themed";
import { useAppThemeStore } from "@/store/app";
import { useState } from "react";
import { List, Switch, Text, useTheme } from "react-native-paper";

export default function ThemeSettingScreen() {
  const theme = useTheme();
  const { isDarkTheme, toggleTheme } = useAppThemeStore();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme.colors.surface,
      }}
    >
      <View
        style={{
          marginHorizontal: 10,
          borderRadius: 10,
        }}
      >
        <List.Item
          title={() => (
            <Text
              style={{
                fontFamily: "Poppins_500Medium",
              }}
            >
              Dark theme
            </Text>
          )}
          right={(props) => (
            <Switch value={isDarkTheme} onValueChange={toggleTheme} />
          )}
        />
      </View>
    </View>
  );
}
