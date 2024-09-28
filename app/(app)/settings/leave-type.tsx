import { View as ScreenView } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";

export default function LeaveTypeScreen() {
  return (
    <ScreenView style={styles.screenView}>
      <Text>leave type</Text>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screenView: {
    flex: 1,
  },
});
