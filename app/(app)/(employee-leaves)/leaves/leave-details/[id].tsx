import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { useLocalSearchParams } from "expo-router";

export default function LeaveDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <View style={styles.screenContainer}>
      <Text>hello</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
  },
});
