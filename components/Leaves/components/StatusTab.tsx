import { useEmployeeLeaves } from "@/api/leaves-request/use-leave-request";
import NotFound from "@/components/Common/NotFound";
import { View as TabScreenView } from "@/components/Themed";
import { useFilterStore } from "@/store/leaveFilter";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import LeaveCard, { type LeaveCardProps } from "./LeaveCard";

const StatusTab = ({ employeeId }: { employeeId: number }) => {
  const { approved, pending, denied } = useFilterStore((state) => ({
    approved: state.approved,
    pending: state.pending,
    denied: state.denied,
  }));
  const { data: employeeLeavesData } = useEmployeeLeaves({
    employeeId,
    status: "pending",
  });
  console.log("pending request", employeeLeavesData);
  const filteredLeaves = employeeLeavesData?.filter((leave) => {
    const matchesApproved = approved ? leave.status === "approved" : true;
    const matchesPending = pending ? leave.status === "pending" : true;
    const matchesDenied = denied ? leave.status === "rejected" : true;

    return matchesApproved && matchesPending && matchesDenied;
  });

  const renderItem = useCallback(
    ({ item }: { item: LeaveCardProps }) => <LeaveCard {...item} />,
    []
  );

  return (
    <TabScreenView style={styles.leaveCardContainer}>
      <FlashList
        showsVerticalScrollIndicator={false}
        contentInsetAdjustmentBehavior="automatic"
        renderItem={renderItem}
        data={filteredLeaves}
        estimatedItemSize={10}
        keyExtractor={(item) => item.id.toString()}
        ListEmptyComponent={<NotFound title={`No pending request`} />}
      />
    </TabScreenView>
  );
};

export default memo(StatusTab);

const styles = StyleSheet.create({
  leaveCardContainer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingBottom: 5,
  },
});
