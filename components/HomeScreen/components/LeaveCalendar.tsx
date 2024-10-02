import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import Calendar from "@/components/EmployeeLeave/components/LeaveCalendar";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { employedata, EmployeeData } from "@/data/employee";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import CustomIcon from "@/ui/custom-icon";
import { BottomSheetFlatList } from "@gorhom/bottom-sheet";
import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, List, Text, useTheme } from "react-native-paper";
import { TextPoppinsRegular } from "../../Text/TextPoppinsRegular";

export default function LeaveCalendar() {
  const theme = useTheme();
  const router = useRouter();
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

  const handleonLongPressMarkedDates = useCallback(() => {
    toggleBottomSheet();
  }, [isOpenBottomSheetLeaves, setVisibility, toggleBottomSheet]);

  const renderEmployeeItem = useCallback(
    ({ item }: { item: EmployeeData }) => (
      <>
        <List.Item
          key={item.id}
          title={() => <TextPoppinsBold>{item.name}</TextPoppinsBold>}
          right={(props) => <CustomIcon name="arrowright" {...props} />}
          left={() => <Avatar.Text size={44} label={item.name[0]} />}
          description={() => (
            <TextPoppinsRegular
              style={{
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
                name: item.name,
                id: item.id,
              },
            });
          }}
        />
      </>
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
        onDismiss={handleDismissBottomSheetDialog}
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
            showsVerticalScrollIndicator={false}
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
