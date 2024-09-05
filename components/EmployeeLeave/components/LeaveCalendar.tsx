import { Calendar } from "react-native-calendars";
import { useTheme } from "react-native-paper";

interface Calendar {
  onPress: (selectedDate: string) => void;
  selectedDate: string;
}

export default function LeaveCalendar(props: Calendar) {
  const { onPress, selectedDate = "2024-10-01" } = props;
  const theme = useTheme();
  const today = new Date();
  const isoString = today.toISOString().split("T")[0];

  return (
    <Calendar
      theme={{
        selectedDayBackgroundColor: theme.colors.primary,
        shadow: theme.colors.shadow,
      }}
      onDayPress={(day: any) => {
        onPress(day.dateString);
      }}
      minDate={isoString}
      markedDates={{
        [selectedDate]: {
          selected: true,
          disableTouchEvent: true,
          selectedColor: theme.colors.primary,
        },
      }}
    />
  );
}
