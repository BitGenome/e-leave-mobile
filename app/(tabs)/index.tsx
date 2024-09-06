import { View } from "@/components/Themed";
import { SafeAreaView, StyleSheet } from "react-native";
import { Text, useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text variant="displayMedium">Home</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
