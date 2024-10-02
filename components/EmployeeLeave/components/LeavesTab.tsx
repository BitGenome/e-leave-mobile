import { type LeaveType } from "@/app/(app)/(tabs)/leaves";
import NotFound from "@/components/Common/NotFound";
import LeaveCard, {
  LeaveCardProps,
} from "@/components/Leaves/components/LeaveCard";
import { EmployeeLeaves } from "@/data/leaves";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { Animated, View } from "react-native";

export default function LeaveTab({ tab }: { tab: LeaveType }) {
  const scrollOffsetY = useTabBarVisibility();
  console.log("tab", tab);
  const renderItem = useCallback(
    ({ item }: { item: LeaveCardProps }) => <LeaveCard {...item} />,
    []
  );

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 10,
        marginTop: 5,
      }}
    >
      <FlashList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={renderItem}
        data={EmployeeLeaves}
        estimatedItemSize={20}
        ListEmptyComponent={<NotFound title="No employee leave found." />}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}
