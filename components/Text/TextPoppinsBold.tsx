import { Text, TextProps } from "react-native-paper";

export function TextPoppinsBold(props: TextProps<typeof Text>) {
  return (
    <Text {...props} style={[props.style, { fontFamily: "Poppins_700Bold" }]} />
  );
}
