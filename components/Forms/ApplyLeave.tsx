import { employee } from "@/data/employee";
import { leaveType } from "@/data/leave-type";
import { time } from "@/data/time";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import PrimaryButton from "@/ui/primary-button";
import { useCallback, useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { type CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import BottomSheetSelect, {
  type SelectValue,
} from "../BottomSheet/BottomSheetSelect/BottomSheetSelect";
import { useLeaveTypeData } from "@/api/leave-type/use-leave-type-data";

interface IDateRange {
  startDate: CalendarDate;
  endDate: CalendarDate;
}

const LOCALE = "en-GB";
const TODAY = new Date();

export default function ApplyEmployeeLeaveForm() {
  const theme = useTheme();
  const { data } = useLeaveTypeData();
  const [range, setRange] = useState<Partial<IDateRange>>({
    startDate: undefined,
    endDate: undefined,
  });
  const { state: isOpebDateSelector, toggle: toogleDate } = useVisibility({
    defaultVisiblityState: false,
  });
  const [selectedValue, setSelectedValue] = useState<
    string | number | undefined
  >(undefined);

  const handleSelect = (option: SelectValue) => {
    setSelectedValue(option);
  };

  const onDismiss = useCallback(() => {
    toogleDate();
  }, [toogleDate]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: IDateRange) => {
      toogleDate();
      setRange({ startDate, endDate });
    },
    [toogleDate, setRange]
  );

  const dateFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat(LOCALE, {
        day: "numeric",
        month: "long",
        year: "numeric",
      }),
    [LOCALE]
  );

  const leaveTypeOption = data?.map((type) => ({
    label: type.leave_name,
    value: type.id,
  }));

  return (
    <View style={styles.formContainer}>
      <View
        style={[
          styles.formLayoutContainer,
          { backgroundColor: theme.colors.surface },
        ]}
      >
        <View
          style={{
            gap: 10,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              columnGap: 5,
              flex: 1,
              width: "100%",
            }}
          >
            <View
              style={{
                flexShrink: 1,
              }}
            >
              <Text variant="labelMedium">Select Inclusive Dates</Text>
              {
                <Text
                  variant="bodySmall"
                  allowFontScaling
                  maxFontSizeMultiplier={1.5}
                  ellipsizeMode="middle"
                  numberOfLines={1}
                >
                  {!range.startDate && !range.endDate
                    ? "No dates selected."
                    : !range.endDate
                    ? range.startDate
                      ? dateFormatter.format(range.startDate)
                      : ""
                    : [
                        range.startDate
                          ? dateFormatter.format(range.startDate)
                          : "",
                        range.endDate
                          ? dateFormatter.format(range.endDate)
                          : "",
                      ].join(" - ")}
                </Text>
              }
            </View>
            <Button mode="outlined" onPress={toogleDate}>
              Select Date
            </Button>
          </View>
          <DatePickerModal
            locale={LOCALE}
            mode="range"
            visible={isOpebDateSelector}
            onDismiss={onDismiss}
            startDate={range.startDate}
            endDate={range.endDate}
            onConfirm={onConfirm}
            validRange={{ startDate: TODAY }}
            presentationStyle="pageSheet"
          />
        </View>
        <BottomSheetSelect
          label="Duration"
          options={time}
          onSelect={handleSelect}
          header="Select leave duration"
        />
        <BottomSheetSelect
          label="Employee name"
          options={employee}
          onSelect={handleSelect}
          header="Employee name"
        />
        <TextInput
          mode="outlined"
          placeholder="Remarks"
          theme={{ roundness: 8 }}
          multiline
          style={[
            styles.textMultiline,
            { backgroundColor: theme.colors.surface },
          ]}
        />

        <BottomSheetSelect
          label="Select leave type"
          options={leaveTypeOption}
          onSelect={(value) => handleSelect(value)}
          header="Select leave type"
        />
        <PrimaryButton>Apply Leave</PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  textMultiline: {
    minHeight: 100,
    paddingVertical: 10,
  },
  formLayoutContainer: {
    gap: 12,
    padding: 20,
    borderRadius: 12,
    flex: 1,
  },
});
