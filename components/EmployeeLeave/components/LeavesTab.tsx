import { type leaveStatusType } from "@/api/database/schema";
import { useLeaveRequests } from "@/api/leaves-request/use-leave-request";
import NotFound from "@/components/Common/NotFound";
import LeaveCard, {
  LeaveCardProps,
} from "@/components/Leaves/components/LeaveCard";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { useCallback } from "react";
import { Animated, View } from "react-native";

export default function LeaveTab({ tab }: { tab: leaveStatusType }) {
  const scrollOffsetY = useTabBarVisibility();

  const { leaveData, hasMore, loadMore, refreshData, isLoading } =
    useLeaveRequests({
      status: tab,
    });
  // const {
  //   data: leaveRequestData,

  //   nextPage,
  // } = useLeaveRequest({
  //   status: tab ?? "pending",
  // });

  if (tab === "approved") {
    console.log(" leave data lenth", leaveData?.length, "status:", tab);
  }
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
        data={leaveData}
        estimatedItemSize={5}
        onEndReached={loadMore}
        onEndReachedThreshold={0.7}
        onRefresh={refreshData}
        refreshing={isLoading}
        ListEmptyComponent={
          <NotFound
            title={
              <>
                No leave status{" "}
                <TextPoppinsBold
                  style={{
                    textTransform: "capitalize",
                  }}
                >
                  {tab}
                </TextPoppinsBold>{" "}
                found.
              </>
            }
          />
        }
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false }
        )}
      />
    </View>
  );
}
