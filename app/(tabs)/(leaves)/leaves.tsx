import LeaveCard from "@/components/Leaves/components/LeaveCard";
import { View } from "@/components/Themed";
import { EmployeeLeaves } from "@/data/leaves";
import { useAppStore } from "@/store/app";
import { FlashList } from "@shopify/flash-list";
import { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LeavesScreen() {
  const inset = useSafeAreaInsets();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [isTabBarVisible, hideTabBar, showTabBar] = useAppStore((state) => [
    state.isTabbarVisible,
    state.hideTabBar,
    state.showTabBar,
  ]);

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > 50) {
      hideTabBar(); // Hide the tab bar when scrolling down
    } else {
      showTabBar(); // Show the tab bar when scrolling up
    }
  };

  return (
    <View style={[styles.container, { marginTop: inset.top }]}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => <LeaveCard {...item} />}
        data={EmployeeLeaves}
        estimatedItemSize={20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      />
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
