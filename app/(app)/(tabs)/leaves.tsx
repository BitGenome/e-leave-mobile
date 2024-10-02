import LeaveTab from "@/components/EmployeeLeave/components/LeavesTab";
import { View as ScreenView } from "@/components/Themed";
import CustomIcon from "@/ui/custom-icon";
import { Stack } from "expo-router";
import { StyleSheet, View } from "react-native";
import { IconButton, Searchbar, useTheme } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";

export type LeaveType = "pending" | "approved" | "denied";

const tabs: { label: string; leaveType: LeaveType }[] = [
  { label: "Pending", leaveType: "pending" },
  { label: "Approved", leaveType: "approved" },
  { label: "Denied", leaveType: "denied" },
];

export default function LeavesScreen() {
  const theme = useTheme();

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => (
            <IconButton
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
