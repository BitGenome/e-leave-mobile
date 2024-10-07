import { type leaveStatusType } from "@/api/database/schema";
import LeaveTab from "@/components/EmployeeLeave/components/LeavesTab";
import { View as ScreenView } from "@/components/Themed";
import CustomIcon from "@/ui/custom-icon";
import { Stack, useRouter } from "expo-router";
import { StyleSheet } from "react-native";
import { IconButton } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";

const tabs: { label: string; leaveType: leaveStatusType }[] = [
  { label: "Pending", leaveType: "pending" },
  { label: "Approved", leaveType: "approved" },
  { label: "Denied", leaveType: "rejected" },
];

export default function LeavesScreen() {
  const router = useRouter();
  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: "left",
          headerRight: () => (
            <IconButton
              onPress={() =>
                router.navigate("/(app)/(employee-leaves)/leaves/search-leaves")
              }
              icon={() => <CustomIcon name="search" library="ionic" />}
            />
          ),
        }}
      />
      <ScreenView style={[styles.container]}>
        <Tabs>
          {tabs.map((tab, index) => (
            <TabScreen key={index} label={tab.label}>
              <LeaveTab tab={tab.leaveType} />
            </TabScreen>
          ))}
        </Tabs>
      </ScreenView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 10,
    marginVertical: 15,
    marginBottom: 10,
    flexDirection: "row",
    gap: 5,
  },
});
