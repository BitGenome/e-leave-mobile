import ApplyEmployeeLeaveForm from "@/components/Forms/ApplyLeave";
import { View } from "@/components/Themed";
import { ScrollView, StyleSheet } from "react-native";

export default function ApplyLeaveScreen() {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ApplyEmployeeLeaveForm />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, marginTop: 10, margin: 5 },
});
