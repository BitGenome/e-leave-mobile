import CustomIcon from "@/ui/custom-icon";
import { useCallback } from "react";
import { StyleSheet } from "react-native";
import { Calendar, type DateData } from "react-native-calendars";
import { type MarkingProps } from "react-native-calendars/src/calendar/day/marking";
import { useTheme } from "react-native-paper";

interface Calendar {
  onPressMarkedDates: (selectedDate: DateData) => void;
  /**list of dates to be marked */
  leavesDates?: string[];
}

const todayDate = new Date();
const today = todayDate.toISOString().split("T")[0];

export default function LeaveCalendar(props: Calendar) {
  const { onPressMarkedDates, leavesDates = ["2024-09-19", "2024-09-21"] } =
    props;

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
  const markedDates: Record<string, MarkingProps> = leavesDates.reduce(
    (acc, date) => {
      acc[date] = { ...markedDateStyles };
      return acc;
    },
    {} as Record<string, MarkingProps>
  );

  //handle dates press to only select the marked dates.
  const handleDayLongPress = useCallback(
    (date: DateData) => {
      const { dateString } = date;
      if (!markedDates[dateString as keyof typeof markedDates]) {
        return;
      }

      onPressMarkedDates(date);
      return;
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
      markedDates={markedDates}
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
