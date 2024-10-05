import NotFound from "@/components/Common/NotFound";
import { View as TabScreenView } from "@/components/Themed";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import LeaveCard, { LeaveCardProps } from "./LeaveCard";
import { useEmployeeLeaves } from "@/api/leaves-request/use-leave-request";

const HistoryTab = ({ employeeId }: { employeeId: number }) => {
  const { data: employeeLeavesData } = useEmployeeLeaves({
    employeeId,
    status: "approved",
  });

  const renderItem = useCallback(
    ({ item }: { item: LeaveCardProps }) => <LeaveCard {...item} />,
    []
  );
  return (
    <TabScreenView style={styles.screenWrapper}>
      <FlashList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={renderItem}
        data={employeeLeavesData}
        estimatedItemSize={20}
        ListEmptyComponent={<NotFound title={`No leave request`} />}
      />
    </TabScreenView>
  );
};

export default memo(HistoryTab);

const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
});
