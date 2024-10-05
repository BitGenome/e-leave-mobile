import { LeaveDate } from "@/api/leaves-request/use-leave-request";
import CustomIcon from "@/ui/custom-icon";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";
import { type MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { useTheme } from "react-native-paper";
import { type Employee } from "../../Leaves/components/LeaveCard";
import { employees } from "../../../api/database/schema";

export interface SelectedData {
  selectedDate: DateData;
  employee: TEmployee[];
}

export interface TEmployee extends Omit<Employee, "employee_no"> {
  id: number;
  position: string;
}

interface Calendar {
  onPressMarkedDates: (props: SelectedData) => void;
  /**list of dates to be marked */
  leavesDates: LeaveDate[];
}

const todayDate = new Date();
const today = todayDate.toISOString().split("T")[0];

export default function LeaveCalendar(props: Calendar) {
  const { onPressMarkedDates, leavesDates } = props;
  const theme = useTheme();

  const markedDateStyles = {
    color: theme.colors.primary,
    customContainerStyle: {
      borderRadius: 8,
      backgroundColor: theme.colors.primary,
    },
    selectedColor: theme.colors.primary,
    endingDay: false,
    marked: false,
    selected: true,
    startingDay: true,
    textColor: theme.colors.surface,
  };

  const markedDates: Record<
    string,
    { marking: MarkingProps; employees: TEmployee[] }
  > = leavesDates?.reduce((acc, { date, employees }) => {
    acc[date] = {
      marking: markedDateStyles,
      employees,
    };

    return acc;
  }, {} as Record<string, { marking: MarkingProps; employees: TEmployee[] }>);

  //handle dates press to only select the marked dates.
  const handleDayLongPress = useCallback(
    (data: DateData) => {
      const { dateString } = data;
      const markedDate = markedDates[dateString];

      if (!markedDate) {
        return;
      }

      onPressMarkedDates({
        employee: markedDate.employees,
        selectedDate: data,
      });
    },
    [markedDates]
  );
  return (
    <Calendar
      style={[
        styles.calendar,
        {
          backgroundColor: theme.colors.background,
          borderColor: theme.colors.inverseOnSurface,
        },
      ]}
      theme={{
        arrowHeight: 28,
        textDayFontFamily: "Poppins_700Bold",
        textDayHeaderFontFamily: "Poppins_600SemiBold",
        textMonthFontFamily: "Poppins_600SemiBold",
        calendarBackground: theme.colors.background,
        selectedDayBackgroundColor: theme.colors.primaryContainer,
        arrowColor: theme.colors.secondary,
      }}
      initialDate={today}
      hideExtraDays
      renderArrow={(direction) => {
        return direction === "right" ? (
          <CustomIcon name="arrowright" />
        ) : (
          <CustomIcon name="arrowleft" />
        );
      }}
      enableSwipeMonths
      onDayLongPress={handleDayLongPress}
      markedDates={Object.fromEntries(
        Object.entries(markedDates).map(([date, { marking }]) => [
          date,
          marking,
        ])
      )}
    />
  );
}

const styles = StyleSheet.create({
  calendar: {
    borderRadius: 15,
    borderWidth: 1,
    padding: 5,
  },
});
