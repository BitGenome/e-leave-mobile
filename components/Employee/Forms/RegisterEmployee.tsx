import { StyleSheet, View } from "react-native";
import { Button, MD3Theme, TextInput, useTheme } from "react-native-paper";

export default function RegisterEmployeeForm() {
  const theme = useTheme();
  const styles = createStyles(theme);
  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        placeholder="First name"
        theme={{ roundness: 8 }}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        placeholder="Last name"
        style={styles.input}
        theme={{ roundness: 8 }}
      />
      <Button
        mode="contained"
        style={styles.submit}
        labelStyle={{ fontSize: 15, fontWeight: "bold", lineHeight: 40 }}
        onPress={() => console.log("hello")}
      >
        Save
      </Button>
    </View>
  );
}
const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    formContainer: {
      flex: 1,
      gap: 15,
    },
    submit: {
      marginTop: 20,
      textAlignVertical: "center",
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
    },
  });
};
