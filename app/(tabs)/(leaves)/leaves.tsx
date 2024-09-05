import { StyleSheet } from "react-native";
import LeaveCard from "@/components/Leaves/components/LeaveCard";
import { View } from "@/components/Themed";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeavesScreen() {
  const inset = useSafeAreaInsets();
  return (
    <View style={[styles.container, { marginTop: inset.top }]}>
      <LeaveCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 15,
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
