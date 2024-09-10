import { StyleSheet, View } from "react-native";
import { ProgressBar, Text, useTheme } from "react-native-paper";

export default function AnnualLeaveCard() {
  const theme = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.primary }]}>
      <Text style={[styles.label, { color: theme.colors.surface }]}>
        Annual Leaves
      </Text>
      <Text variant="headlineLarge">98</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    height: 130,
    borderRadius: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    alignContent: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
  },
});
