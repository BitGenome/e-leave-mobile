import { Text, TextProps } from "react-native-paper";

export function TextPoppinsRegular(props: TextProps<typeof Text>) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "Poppins_400Regular" }]}
    />
  );
}
