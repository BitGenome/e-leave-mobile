import { useRef, useState } from "react";
import { Calendar } from "react-native-calendars";
import { useTheme } from "react-native-paper";

interface Calendar {
  onPress: (selectedDate: string) => void;
  selectedDate: string;
}

export default function LeaveCalendar(props: Calendar) {
  const { onPress, selectedDate = "2024-10-01" } = props;
  const theme = useTheme();
  const todayDate = new Date();
  const today = todayDate.toISOString().split("T")[0];

  const startDateRef = useRef<string>(today);
  const endDateRef = useRef<string>();
  const [markedDates, setMarkedDates] = useState<Record<string, any>>({});

  return (
    <Calendar
      theme={{
        selectedDayBackgroundColor: theme.colors.primaryContainer,
      }}
      onDayPress={(day: any) => {
        if (!startDateRef.current) {
          startDateRef.current = day.dateString;
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
            startDate = new Date(startDateRef.current);
          }
          const betweenDates: any = {};
          for (
            const dt = new Date(startDate);
            dt <= new Date(endDate);
            dt.setDate(dt.getDate() + 1)
          ) {
            betweenDates[dt.toISOString().split("T")[0]] = {
              selected: true,
              marked: false,
              color: theme.colors.primaryContainer,
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
        }
      }}
      hideExtraDays
      enableSwipeMonths
      markingType={"period"}
      minDate={today}
      markedDates={markedDates}
    />
  );
}
