import LeaveCard from "@/components/Leaves/components/LeaveCard";
import { View } from "@/components/Themed";
import { EmployeeLeaves } from "@/data/leaves";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { Animated, StyleSheet } from "react-native";
import { Text } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";

export default function LeavesScreen() {
  const scrollOffsetY = useTabBarVisibility();
  // const [hideTabBar, showTabBar] = useAppStore((state) => [
  //   state.hideTabBar,
  //   state.showTabBar,
  // ]);

  // const scrollOffsetY = useRef(new Animated.Value(0)).current;
  // const handleScroll = (event: any) => {
  //   const currentOffset = event.nativeEvent.contentOffset.y;

  //   if (currentOffset > 50) {
  //     hideTabBar(); // Hide the tab bar when scrolling down
  //   } else {
  //     showTabBar(); // Show the tab bar when scrolling up
  //   }
  // };

  return (
    <View style={[styles.container]}>
      <Tabs>
        <TabScreen label="Status">
          <View style={styles.leaveCardContainer}>
            <FlashList
              showsVerticalScrollIndicator={false}
              contentInsetAdjustmentBehavior="automatic"
              renderItem={({ item }) => <LeaveCard {...item} />}
              data={EmployeeLeaves}
              estimatedItemSize={20}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
                { useNativeDriver: false }
              )}
            />
          </View>
        </TabScreen>
        <TabScreen label="History">
          <Text>text</Text>
        </TabScreen>
      </Tabs>
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
  leaveCardContainer: {
    flex: 1,
    marginTop: 10,
  },
});
