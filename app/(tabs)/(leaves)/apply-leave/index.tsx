import { StyleSheet, View } from "react-native";

import EditScreenInfo from "@/components/EditScreenInfo";
import { Text } from "react-native-paper";

export default function ApplyLeaveScreen() {
  return (
    <View style={styles.container}>
      <Text variant="headlineLarge">Apply leave</Text>
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
