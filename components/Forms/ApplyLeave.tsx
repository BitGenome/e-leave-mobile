import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { TextInput, useTheme } from "react-native-paper";
import BottomSheetSelect from "../BottomSheetSelect/BottomSheetSelect";
import LeaveCalendar from "../EmployeeLeave/components/LeaveCalendar";
import { employee } from "@/data/employee";
import { leaveType } from "@/data/leave-type";

export default function ApplyEmployeeLeaveForm() {
  const theme = useTheme();
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(undefined);

  const handleSelect = (option: { label: string; value: string | number }) => {
    setSelectedValue(option.value);
  };
  return (
    <View style={[styles.formContainer]}>
      <View
        style={[
          styles.formLayoutContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <LeaveCalendar selectedDate={selectedDate} onPress={setSelectedDate} />
        <BottomSheetSelect
          label="Employee name"
          options={employee}
          selectedValue={undefined}
          onSelect={handleSelect}
          header="Employee name"
        />
        <TextInput
          mode="outlined"
          placeholder="What is the employee reason?"
          theme={{ roundness: 8 }}
          multiline
          style={[
            styles.textMultiline,
            { backgroundColor: theme.colors.surface },
          ]}
        />

        <BottomSheetSelect
          label="Select leave type"
          options={leaveType}
          selectedValue={leaveType.find((opt) => opt.value === selectedValue)}
          onSelect={handleSelect}
          header="Leave type"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  textMultiline: {
    minHeight: 100,
    paddingVertical: 10,
  },
  formLayoutContainer: {
    gap: 15,
    padding: 20,
    borderRadius: 12,
  },
});
