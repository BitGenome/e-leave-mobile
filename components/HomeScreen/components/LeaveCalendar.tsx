import {
  getDatesWithCalendar,
  getEmployeeWithLeaveRequestOnGivenDate,
} from "@/api/leaves-request/use-leave-request";
import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import NotFound from "@/components/Common/NotFound";
import Calendar, {
  SelectedData,
  type TEmployee,
} from "@/components/EmployeeLeave/components/LeaveCalendar";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import CustomIcon from "@/ui/custom-icon";
import { nameFormatter } from "@/utils/nameFormatter";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useFocusEffect, useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, List, Text, useTheme } from "react-native-paper";
import { TextPoppinsRegular } from "../../Text/TextPoppinsRegular";

const MODAL_SNAP_POINTS = ["50%", "95%"];

export default function LeaveCalendar() {
  const theme = useTheme();
  const router = useRouter();
  const [employeeData, setEmployeeData] = useState<TEmployee[] | undefined>([]);
  const [selectedLeaveDate, setSelectedLeaveDate] = useState<
    SelectedData | undefined
  >(undefined);

  const leaveCalendar = getDatesWithCalendar();

  const {
    state: isOpenBottomSheetLeaves,
    setVisibility,
    toggle: toggleBottomSheet,
  } = useVisibility({
    defaultVisiblityState: false,
  });

  const handleDismissBottomSheetDialog = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  const handleonLongPressMarkedDates = useCallback(
    (selectedDate: SelectedData) => {
      setSelectedLeaveDate(selectedDate);
      toggleBottomSheet();
    },
    [
      isOpenBottomSheetLeaves,
      setVisibility,
      toggleBottomSheet,
      setSelectedLeaveDate,
    ]
  );

  const employeeIds = selectedLeaveDate?.employee.map((emp) => emp.id) || [];

  const handleFetchEmployeeWithLeave = useCallback(async () => {
    const data = await getEmployeeWithLeaveRequestOnGivenDate({
      employee_id: employeeIds,
    });

    if (!data || data.length < 1) return;

    setEmployeeData(data);
  }, [selectedLeaveDate?.employee, setEmployeeData]);

  useFocusEffect(
    useCallback(() => {
      handleFetchEmployeeWithLeave();
    }, [handleFetchEmployeeWithLeave])
  );

  const renderEmployeeItem = useCallback(({ item }: { item: TEmployee }) => {
    const employeeName = nameFormatter({
      first_name: item.first_name,
      last_name: item.last_name,
    });
    return (
      <>
        <List.Item
          key={item.id}
          title={() => <TextPoppinsBold>{employeeName}</TextPoppinsBold>}
          right={(props) => <CustomIcon name="arrowright" {...props} />}
          left={() => <Avatar.Text size={44} label={item.first_name[0]} />}
          description={() => (
            <TextPoppinsRegular
              style={{
                textTransform: "capitalize",
                color: theme.colors.outline,
              }}
            >
              {item.position}
            </TextPoppinsRegular>
          )}
          titleStyle={{
            fontFamily: "Poppins_500Medium",
          }}
          style={{
            padding: 10,
          }}
          onPress={() => {
            handleDismissBottomSheetDialog();
            return router.navigate({
              pathname: "/(employee-leaves)/leaves/[id]",
              params: {
                name: employeeName,
                id: item.id,
              },
            });
          }}
        />
      </>
    );
  }, []);

  return (
    <View style={styles.wrapper}>
      <Text style={styles.sectionLabel}>Leave Calendar</Text>
      <Calendar
        leavesDates={leaveCalendar}
        onPressMarkedDates={handleonLongPressMarkedDates}
      />
      <BottomSheetViewContainer
        isList
        snapPoints={MODAL_SNAP_POINTS}
        openBottomSheet={isOpenBottomSheetLeaves}
        onDismiss={handleDismissBottomSheetDialog}
        enableDynamicSizing
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalLabel}>Employees with leaves</Text>
          <BottomSheetFlatList
            showsVerticalScrollIndicator={false}
            data={employeeData}
            renderItem={renderEmployeeItem}
            keyExtractor={(item) => item.id.toString()}
            ListEmptyComponent={<NotFound />}
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
  modalLabel: {
    fontFamily: "Poppins_600SemiBold",
    textAlign: "center",
  },
  modalContainer: {
    paddingVertical: 10,
    flex: 1,
  },
});
