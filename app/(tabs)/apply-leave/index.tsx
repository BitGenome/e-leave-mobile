import ApplyEmployeeLeaveForm from "@/components/Forms/ApplyLeave";
import { ScrollView, StyleSheet } from "react-native";

export default function ApplyLeaveScreen() {
  return (
    <ScrollView style={styles.container}>
      <ApplyEmployeeLeaveForm />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10 },
});
