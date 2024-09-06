import { StyleSheet } from "react-native";
import { Button, ButtonProps, useTheme } from "react-native-paper";

function SecondaryButton(props: ButtonProps) {
  const theme = useTheme();
  return (
    <Button
      {...props}
      mode="contained"
      style={[
        props.style,
        styles.primary,
        { backgroundColor: theme.colors.secondary },
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
