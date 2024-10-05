import { useEmployeeLeaves } from "@/api/leaves-request/use-leave-request";
import { View as TabScreenView } from "@/components/Themed";
import { EmployeeLeaves } from "@/data/leaves";
import { useFilterStore } from "@/store/leaveFilter";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback } from "react";
import { StyleSheet } from "react-native";
import LeaveCard, { LeaveCardProps } from "./LeaveCard";
import NotFound from "@/components/Common/NotFound";

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
  const filteredLeaves = EmployeeLeaves.filter((leave) => {
    const matchesApproved = approved ? leave.status === "approved" : true;
    const matchesPending = pending ? leave.status === "pending" : true;
    const matchesDenied = denied ? leave.status === "denied" : true;

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
        data={employeeLeavesData}
        estimatedItemSize={20}
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
