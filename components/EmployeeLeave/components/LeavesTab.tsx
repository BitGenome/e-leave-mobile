import { type leaveStatusType } from "@/api/database/schema";
import { useLeaveRequest } from "@/api/leaves-request/use-leave-request";
import NotFound from "@/components/Common/NotFound";
import LeaveCard, {
  LeaveCardProps,
} from "@/components/Leaves/components/LeaveCard";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Animated, View } from "react-native";
import { toast } from "sonner-native";

export default function LeaveTab({ tab }: { tab: leaveStatusType }) {
  const scrollOffsetY = useTabBarVisibility();
  const { data: leaveRequestData, error } = useLeaveRequest({
    status: tab ?? "pending",
  });

  const renderItem = useCallback(
    ({ item }: { item: LeaveCardProps }) => <LeaveCard {...item} />,
    []
  );

  useFocusEffect(
    useCallback(() => {
      if (!!error)
        toast.error("Error", {
          description: error.message,
        });
    }, [error, toast])
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
        data={leaveRequestData}
        estimatedItemSize={20}
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
