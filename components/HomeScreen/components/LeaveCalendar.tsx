import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import Calendar from "@/components/EmployeeLeave/components/LeaveCalendar";
import { employedata, EmployeeData } from "@/data/employee";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { List, Text } from "react-native-paper";

export default function LeaveCalendar() {
  const router = useRouter();
  const {
    state: isOpenBottomSheetLeaves,
    setVisibility,
    toggle: toggleBottomSheet,
  } = useVisibility({
    defaultVisiblityState: false,
  });

  const handleonLongPressMarkedDates = useCallback(() => {
    toggleBottomSheet();
  }, [isOpenBottomSheetLeaves, setVisibility, toggleBottomSheet]);

  const renderEmployeeItem = useCallback(
    ({ item }: { item: EmployeeData }) => (
      <List.Item
        titleStyle={{
          fontFamily: "Poppins_500Medium",
        }}
        onPress={() => {
          toggleBottomSheet();
          return router.navigate({
            pathname: "/(employee-leaves)/leaves/[id]",
            params: {
              name: item.name,
              id: item.id,
            },
          });
        }}
        key={item.id}
        title={item.name}
      />
    ),
    []
  );

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Leave Calendar</Text>
      <Calendar onPressMarkedDates={handleonLongPressMarkedDates} />
      <BottomSheetViewContainer
        isList
        openBottomSheet={isOpenBottomSheetLeaves}
      >
        <View
          style={{
            paddingVertical: 10,
            flex: 1,
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_600SemiBold",
              textAlign: "center",
            }}
          >
            Employees with leaves
          </Text>
          <BottomSheetFlatList
            data={employedata}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item.id}
          />
        </View>
      </BottomSheetViewContainer>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
  },
  sectionLabel: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
});
