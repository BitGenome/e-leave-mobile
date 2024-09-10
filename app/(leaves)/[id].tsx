import LeaveCard from "@/components/Leaves/components/LeaveCard";
import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import { EmployeeLeaves } from "@/data/leaves";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { Stack, useLocalSearchParams } from "expo-router";
import { Animated, StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmployeeLeaveScreen() {
  const scrollOffsetY = useTabBarVisibility();
  const param = useLocalSearchParams<{ name: string; id: string }>();
  const { bottom } = useSafeAreaInsets();

  return (
    <View style={[styles.container, { marginBottom: 12 + bottom }]}>
      <Stack.Screen
        options={{
          headerTitle: () => <NavigationHeaderTitle title={param.name} />,
        }}
      />
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
