import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import HistoryTab from "@/components/Leaves/components/HistoryTab";
import StatusTab from "@/components/Leaves/components/StatusTab";
import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import { EmployeeLeaves } from "@/data/leaves";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import { FilterOptions, useFilterStore } from "@/store/leaveFilter";
import CustomIcon from "@/ui/custom-icon";
import { Stack, useLocalSearchParams } from "expo-router";
import { useCallback, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { Checkbox, IconButton, Text, useTheme } from "react-native-paper";
import { Tabs, TabScreen } from "react-native-paper-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const tabs = [
  { label: "Status", component: <StatusTab /> },
  { label: "History", component: <HistoryTab /> },
];

export default function EmployeeLeaveScreen() {
  const param = useLocalSearchParams<{ name: string; id: string }>();
  const theme = useTheme();
  const { state: isOpenFilterBottomsheet, toggle: toogleFilterBottomSheet } =
    useVisibility({ defaultVisiblityState: false });
  const { bottom } = useSafeAreaInsets();

  const { approved, pending, denied, setFilter } = useFilterStore((state) => ({
    approved: state.approved,
    pending: state.pending,
    denied: state.denied,
    setFilter: state.setFilter,
  }));

  const isEmployeeLeaveHasFilter = useMemo(() => {
    return approved || pending || denied;
  }, [approved, pending, denied]);

  const handleFilterChange =
    (key: keyof FilterOptions) => (checked: boolean) => {
      setFilter(key, checked);
    };

  const renderFilterItem = useCallback(() => {
    return (
      <View style={{ paddingBottom: 10 }}>
        <Text style={styles.bottomSheetHeaderLabel}>Filter</Text>
        <Checkbox.Item
          position="leading"
          label={"Approved"}
          status={approved ? "checked" : "unchecked"}
          onPress={() => handleFilterChange("approved")(!approved)}
        />
        <Checkbox.Item
          position="leading"
          label={"Pending"}
          status={pending ? "checked" : "unchecked"}
          onPress={() => handleFilterChange("pending")(!pending)}
        />
        <Checkbox.Item
          position="leading"
          label={"Denied"}
          status={denied ? "checked" : "unchecked"}
          onPress={() => handleFilterChange("denied")(!denied)}
        />
      </View>
    );
  }, [approved, pending, denied]);

  return (
    <>
      <View style={[styles.container, { marginBottom: 12 + bottom }]}>
        <Stack.Screen
          options={{
            headerShown: true,
            headerTitle: () => <NavigationHeaderTitle title={param.name} />,
            headerRight: () => (
              <IconButton
                iconColor={
                  isEmployeeLeaveHasFilter
                    ? theme.colors.tertiary
                    : theme.colors.primary
                }
                onPress={toogleFilterBottomSheet}
                icon={(props) => (
                  <CustomIcon {...props} name="filter-sharp" library="ionic" />
                )}
              />
            ),
          }}
        />
        <Tabs>
          {tabs.map((tab, index) => (
            <TabScreen key={index} label={tab.label}>
              {tab.component}
            </TabScreen>
          ))}
        </Tabs>
      </View>
      <BottomSheetViewContainer
        openBottomSheet={isOpenFilterBottomsheet}
        onDismiss={toogleFilterBottomSheet}
      >
        {renderFilterItem()}
      </BottomSheetViewContainer>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },

  bottomSheetHeaderLabel: {
    fontFamily: "Poppins_700Bold",
    textAlign: "center",
  },
});
