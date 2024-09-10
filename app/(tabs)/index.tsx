import AnnualLeaveCard from "@/components/HomeScreen/components/AnnualLeaveCard";
import { View } from "@/components/Themed";
import { StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <AnnualLeaveCard />
      <AnnualLeaveCard />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    padding: 10,
    gap: 10,
  },
});
