import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { employedata } from "@/data/employee";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { Href } from "expo-router";
import { Animated, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";

export default function LeavesScreen() {
  const scrollOffsetY = useTabBarVisibility();
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { marginVertical: 10, backgroundColor: theme.colors.background },
      ]}
    >
      <FlashList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item, index }) => (
          <EmployeeCard
            key={index}
            path={"/(employee-leaves)/leaves/[id]" as Href<string>}
            {...item}
          />
        )}
        data={employedata}
        estimatedItemSize={20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
