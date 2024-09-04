import { StyleSheet } from "react-native";
import { Button, ButtonProps } from "react-native-paper";

function PrimaryButton(props: ButtonProps) {
  return (
    <Button
      {...props}
      mode="contained"
      style={[props.style, styles.primary]}
      contentStyle={{
        height: 60,
      }}
      labelStyle={{ fontSize: 17 }}
    >
      {props.children}
    </Button>
  );
}

const styles = StyleSheet.create({
  primary: {
    marginTop: 20,
    textAlignVertical: "center",
  },
});
export default PrimaryButton;
