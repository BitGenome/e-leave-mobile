import { StyleSheet } from "react-native";

import { View } from "@/components/Themed";
import { Text } from "react-native-paper";

export default function LeavesScreen() {
  return (
    <View style={styles.container}>
      <Text>Employee Leaves</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
