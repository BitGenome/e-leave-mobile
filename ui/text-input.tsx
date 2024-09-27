import { StyleSheet } from "react-native";
import { TextInput, TextInputProps, useTheme } from "react-native-paper";

export default function AppTextInput(props: TextInputProps) {
  const theme = useTheme();
  return (
    <TextInput
      mode="outlined"
      outlineStyle={styles.input}
      activeOutlineColor={theme.colors.primary}
      theme={{ roundness: 10 }}
      style={[styles.input, { backgroundColor: theme.colors.inverseOnSurface }]}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    borderRadius: 10,
  },
});
