import ApplyEmployeeLeaveForm from "@/components/Forms/ApplyLeave";
import { StyleSheet, View } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function ApplyLeaveScreen() {
  const inset = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginTop: 5 + inset.top }]}>
      <ApplyEmployeeLeaveForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});
