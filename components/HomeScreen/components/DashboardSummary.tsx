import {
  comprehensiveLeaveSummary,
  summaryLeaveRequest,
} from "@/api/leaves-request/use-leave-request";
import { summarydata } from "@/data/summary";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SummaryCard from "./SummaryCard";

export default function DashboardSummary() {
  const pendingLeaveSummaryData = summaryLeaveRequest({
    status: "pending",
    leaveAccrual: "monthly",
  });
  const summary = comprehensiveLeaveSummary();
  const pendingLeaveCount = pendingLeaveSummaryData?.[0]?.count ?? 0;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      <View style={styles.sectionContainer}>
        {summary?.map((data, _index) => (
          <SummaryCard key={_index} {...data} />
        ))}
      </View>
      <View>
        <SummaryCard
          style={{
            width: "100%",
          }}
          label="Pending request"
          count={pendingLeaveCount}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    gap: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Poppins_600SemiBold",
  },
  sectionContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
    gap: 10,
  },
});
