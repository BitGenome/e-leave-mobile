import { position } from "@/data/position";
import PrimaryButton from "@/ui/primary-button";
import { StyleSheet, View } from "react-native";
import { MD3Theme, TextInput, useTheme } from "react-native-paper";
import BottomSheetSelect from "../BottomSheetSelect/BottomSheetSelect";

export default function RegisterEmployeeForm() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        placeholder="Employee no."
        theme={{ roundness: 8 }}
        style={styles.input}
      />
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
      <BottomSheetSelect
        label={"Select position"}
        selectedValue={undefined}
        options={position}
        onSelect={({ value }) => console.log(value)}
        snapPoint={["35%", "50%"]}
      />
      <PrimaryButton theme={{ roundness: 3 }}>Save</PrimaryButton>
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
    contentContainer: {
      flex: 1,
      padding: 5,
    },
    itemContent: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceDisabled,
      margin: 6,
    },
  });
};
