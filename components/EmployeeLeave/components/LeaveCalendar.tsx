import { useRef, useState } from "react";
import { Calendar, DateData } from "react-native-calendars";
import { useTheme } from "react-native-paper";

interface Calendar {
  onPress: (selectedDate: any) => void;
}

export default function LeaveCalendar(props: Calendar) {
  const { onPress } = props;

  const theme = useTheme();
  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];

  const startDateRef = useRef<string | undefined>();
  const endDateRef = useRef<string>();
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  return (
    <Calendar
      style={{
        backgroundColor: theme.colors.surface,
        borderRadius: 15,
        borderWidth: 1,
        borderColor: theme.colors.inverseOnSurface,
        padding: 5,
      }}
      theme={{
        arrowHeight: 28,
        textDayFontFamily: "Poppins_700Bold",
        textDayHeaderFontFamily: "Poppins_600SemiBold",
        textMonthFontFamily: "Poppins_600SemiBold",
        calendarBackground: theme.colors.surface,
        selectedDayBackgroundColor: theme.colors.primaryContainer,
        arrowColor: theme.colors.secondary,
      }}
      onDayPress={(day: DateData) => {
        if (!startDateRef.current) {
          startDateRef.current = day.dateString;
        } else if (
          day.dateString === startDateRef.current ||
          day.dateString === endDateRef.current
        ) {
          // Reset the start date if the same day is selected
          startDateRef.current = undefined;
          endDateRef.current = undefined;
          setMarkedDates({});
        } else {
          endDateRef.current = day.dateString;
        }

        if (startDateRef.current && endDateRef.current) {
          const pickedDate = new Date(day.dateString);
          let startDate = new Date(startDateRef.current);
          let endDate = new Date(endDateRef.current);

          if (pickedDate.getTime() < startDate.getTime()) {
            endDate = new Date(startDateRef.current);
            startDateRef.current = day.dateString;
            if (startDateRef.current)
              startDate = new Date(startDateRef.current);
          }

          const betweenDates: Record<string, any> = {};
          for (
            const dt = new Date(startDate);
            dt <= new Date(endDate);
            dt.setDate(dt.getDate() + 1)
          ) {
            betweenDates[dt.toISOString().split("T")[0]] = {
              selected: true,
              marked: false,
              color: theme.colors.secondaryContainer,
              textColor: theme.colors.secondary,
              startingDay: false,
              endingDay: false,
              customContainerStyle: {
                borderRadius: 0,
              },
            };
          }
          Object.keys(betweenDates).forEach((x, i) => {
            if (i === 0) {
              betweenDates[x].startingDay = true;
              betweenDates[x].color = theme.colors.secondary;
              betweenDates[x].textColor = "white";
              betweenDates[x].customContainerStyle = {
                borderTopLeftRadius: 8,
                borderBottomLeftRadius: 8,
              };
            }
            if (i === Object.keys(betweenDates).length - 1) {
              betweenDates[x].endingDay = true;
              betweenDates[x].color = theme.colors.secondary;
              betweenDates[x].textColor = theme.colors.surface;
              betweenDates[x].customContainerStyle = {
                borderTopRightRadius: 8,
                borderRadius: 8,
              };
            }
          });
          setMarkedDates({ ...betweenDates });
          onPress({ ...betweenDates });
        } else if (startDateRef.current) {
          // If only start date is set, mark it as the selected day
          setMarkedDates({
            [startDateRef.current]: {
              selected: true,
              color: theme.colors.primaryContainer,
              textColor: theme.colors.primary,
              containerStyle: {
                borderRadius: 10,
              },
            },
          });
        }
      }}
      hideExtraDays
      enableSwipeMonths
      markingType={"period"}
      markedDates={markedDates}
    />
  );
}
