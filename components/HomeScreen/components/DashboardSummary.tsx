import { summarydata } from "@/data/summary";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";
import SummaryCard from "./SummaryCard";
import { monthlyPendingLeaveRequestCount } from "@/api/leaves-request/use-leave-request";

export default function DashboardSummary() {
  const pendingLeaveRequestCount = monthlyPendingLeaveRequestCount();
  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionTitle}>Dashboard Overview</Text>
      <View style={styles.sectionContainer}>
        {summarydata.map((data, _index) => (
          <SummaryCard key={_index} {...data} />
        ))}
      </View>
      <View>
        <SummaryCard
          style={{
            width: "100%",
          }}
          label="Pending request"
          total={pendingLeaveRequestCount}
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
