import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

function SecondaryButton(props: ButtonProps) {
  const theme = useTheme();
  return (
    <Button
      {...props}
      mode="outlined"
      theme={{ roundness: 3 }}
      style={[
        props.style,
        styles.primary,
        { borderColor: theme.colors.secondary, borderWidth: 1 },
      ]}
      contentStyle={{
        height: 55,
      }}
      labelStyle={{ fontSize: 17 }}
    >
      {props.children}
    </Button>
  );
}

const styles = StyleSheet.create({
  primary: {
    textAlignVertical: "center",
  },
});
export default SecondaryButton;
