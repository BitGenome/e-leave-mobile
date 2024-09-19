import { EmployeeLeaves } from "@/data/leaves";
import { FlashList } from "@shopify/flash-list";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import LeaveCard, { LeaveCardProps } from "./LeaveCard";
import { useFilterStore } from "@/store/leaveFilter";
import { View as TabScreenView } from "@/components/Themed";

const StatusTab = () => {
  const { approved, pending, denied } = useFilterStore((state) => ({
    approved: state.approved,
    pending: state.pending,
    denied: state.denied,
  }));

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
        data={filteredLeaves}
        estimatedItemSize={20}
      />
    </TabScreenView>
  );
};

export default memo(StatusTab);

const styles = StyleSheet.create({
  leaveCardContainer: {
    flex: 1,

    paddingHorizontal: 10,
  },
});
