import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import Calendar from "@/components/EmployeeLeave/components/LeaveCalendar";

export default function LeaveCalendar() {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Leave Calendar</Text>
      <Calendar onPress={(data) => console.log(data)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sectionLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
});
