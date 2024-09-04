import { KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import BottomSheetSelect from "../BottomSheetSelect/BottomSheetSelect";
import { useState } from "react";
import LeaveCalendar from "../EmployeeLeave/LeaveCalendar";

export default function ApplyEmployeeLeaveForm() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState<string | number | null>(
    null
  );
  const options = [
    { label: "Sick Leave", value: "option1" },
    { label: "Vacation Leave", value: "option2" },
    { label: "Emergency Leave", value: "option3" },
  ];
  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelectedValue(option.value);
  };
  return (
    <View style={styles.formContainer}>
      <View style={styles.formLayoutContainer}>
        <LeaveCalendar selectedDate={selectedDate} onPress={setSelectedDate} />

        <TextInput
          mode="outlined"
          theme={{ roundness: 8 }}
          placeholder="Employee name"
        />
        <TextInput
          mode="outlined"
          placeholder="What is the employee reason?"
          theme={{ roundness: 8 }}
          multiline
          style={styles.textMultiline}
        />

        <BottomSheetSelect
          label="Select an option"
          options={options}
          selectedValue={options.find((opt) => opt.value === selectedValue)}
          onSelect={handleSelect}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 20,
  },
  textMultiline: {
    minHeight: 100,
    paddingVertical: 10,
  },
  formLayoutContainer: {
    gap: 15,
  },
});
