/**
 * Learn more about Light and Dark modes:
 * https://docs.expo.io/guides/color-schemes/
 */

import { Text as DefaultText, View as DefaultView } from "react-native";

import Colors from "@/constants/Colors";
import { useColorScheme } from "./useColorScheme";
import { useTheme } from "react-native-paper";

type ThemeProps = {
  lightColor?: string;
  darkColor?: string;
};

export type TextProps = ThemeProps & DefaultText["props"];
export type ViewProps = ThemeProps & DefaultView["props"];

export function useThemeColor(
  props: { light?: string; dark?: string },
  colorName: keyof typeof Colors.light & keyof typeof Colors.dark
) {
  const theme = useColorScheme() ?? "light";
  const colorFromProps = props[theme];

  if (colorFromProps) {
    return colorFromProps;
  } else {
    return Colors[theme][colorName];
  }
}

export function Text(props: TextProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();

  return (
    <DefaultText
      style={[{ color: theme.colors.onBackground }, style]}
      {...otherProps}
    />
  );
}

export function View(props: ViewProps) {
  const { style, lightColor, darkColor, ...otherProps } = props;
  const theme = useTheme();

  return (
    <DefaultView
      style={[{ backgroundColor: theme.colors.inverseOnSurface }, style]}
      {...otherProps}
    />
  );
}
