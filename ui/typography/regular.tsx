import { Text as DefaultText, TextProps, useTheme } from "react-native-paper";

export default function Text(props: TextProps<string>) {
  const { style, ...otherProps } = props;
  const theme = useTheme();

  return (
    <DefaultText
      style={[
        { color: theme.colors.onBackground, fontFamily: "Poppins_400Regular" },
        style,
      ]}
      {...otherProps}
    >
      {otherProps.children}
    </DefaultText>
  );
}
