import { useEmployeeData } from "@/api/employees/use-employee-data";
import { useLeaveTypeData } from "@/api/leave-type/use-leave-type-data";
import { time } from "@/data/time";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Control,
  Controller,
  FormState,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
import { Platform, StyleSheet, View } from "react-native";
import { Button, Text, TextInput, useTheme } from "react-native-paper";
import { DatePickerModal } from "react-native-paper-dates";
import { type CalendarDate } from "react-native-paper-dates/lib/typescript/Date/Calendar";
import BottomSheetSelect from "../BottomSheet/BottomSheetSelect/BottomSheetSelect";
import { mapOptions } from "@/utils/selectMapOptionFormatter";

interface IDateRange {
  startDate: CalendarDate;
  endDate: CalendarDate;
}

export interface ApplyLeaveInputProps {
  start_date: CalendarDate;
  end_date?: CalendarDate | null;
  leave_duration: "full_day" | "halfday_morning" | "halfday_afternoon";
  employee: string;
  remarks?: string;
  leave_type: string;
  deducted_leave_type: string;
}

interface ApplyEmployeeLeaveFormProps {
  control: Control<ApplyLeaveInputProps>;
  register: UseFormRegister<ApplyLeaveInputProps>;
  formState: FormState<ApplyLeaveInputProps>;
  setValue: UseFormSetValue<ApplyLeaveInputProps>;
  watch: UseFormWatch<ApplyLeaveInputProps>;
}

const LOCALE = "en-GB";
export const TODAY = new Date();

export default function ApplyEmployeeLeaveForm(
  props: ApplyEmployeeLeaveFormProps
) {
  const { control, register, formState, setValue, watch } = props;
  const theme = useTheme();
  const { data } = useLeaveTypeData();
  const { data: employeeData } = useEmployeeData();

  const [range, setRange] = useState<Partial<IDateRange>>({
    startDate: undefined,
    endDate: undefined,
  });
  const { state: isOpebDateSelector, toggle: toogleDate } = useVisibility({
    defaultVisiblityState: false,
  });

  const onDismiss = useCallback(() => {
    toogleDate();
  }, [toogleDate]);

  const onConfirm = useCallback(
    ({ startDate, endDate }: IDateRange) => {
      toogleDate();
      setRange({ startDate, endDate });
      setValue("start_date", startDate);
      setValue("end_date", endDate);
    },
    [toogleDate, setRange, setValue]
  );

  useFocusEffect(
    useCallback(() => {
      register("start_date");
      register("end_date");
    }, [register])
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

  const leaveTypeOption = mapOptions(data, "leave_name", "id");

  const employeeDataOption = employeeData?.map((emp) => ({
    label: `${emp.first_name} ${emp.last_name}`,
    value: emp.employee_id,
  }));

  const leaveTypeValue = watch("leave_type");
  useEffect(() => {
    if (leaveTypeValue) {
      setValue("deducted_leave_type", leaveTypeValue);
    }
  }, [leaveTypeValue, setValue]);

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
          <View style={styles.dateSelectorContainer}>
            <View
              style={{
                flexShrink: 1,
              }}
            >
              <Text variant="labelSmall">Select Inclusive Dates</Text>
              {
                <Text
                  variant="bodySmall"
                  allowFontScaling
                  maxFontSizeMultiplier={1.5}
                  ellipsizeMode="middle"
                  numberOfLines={1}
                  style={{
                    fontWeight: "bold",
                  }}
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
            <Button
              mode="outlined"
              onPress={toogleDate}
              style={{
                borderColor: Boolean(formState?.errors?.start_date?.message)
                  ? theme.colors.error
                  : undefined,
              }}
            >
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
        <Controller
          control={control}
          name="leave_duration"
          render={({
            field: { onChange, value, ...rest },
            fieldState: { error },
          }) => (
            <BottomSheetSelect
              snapPoint={["50%", "70%"]}
              error={Boolean(error?.message)}
              label="Duration"
              options={time}
              value={value}
              onSelect={onChange}
              {...rest}
              header="Select leave duration"
            />
          )}
        />

        <Controller
          control={control}
          name="employee"
          render={({ field, fieldState: { error } }) => {
            return (
              <BottomSheetSelect
                snapPoint={["50%", `96%`]}
                error={Boolean(error?.message)}
                label="Employee name"
                options={employeeDataOption}
                onSelect={field.onChange}
                value={field.value.toString()}
                header="Employee name"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="leave_type"
          render={({ field: { onChange, value }, fieldState: { error } }) => {
            return (
              <BottomSheetSelect
                value={value}
                error={Boolean(error?.message)}
                label="Select leave type"
                //@ts-ignore
                options={leaveTypeOption}
                onSelect={onChange}
                header="Select leave type"
              />
            );
          }}
        />

        <Controller
          control={control}
          name="deducted_leave_type"
          render={({ field: { onChange, value }, fieldState: { error } }) => (
            <BottomSheetSelect
              value={value}
              error={Boolean(error?.message)}
              label={`Deduct leave type`}
              //@ts-ignore
              options={leaveTypeOption}
              onSelect={onChange}
              header="Select on where to deduct leave balance"
            />
          )}
        />
        <Controller
          control={control}
          name="remarks"
          render={({
            field: { onBlur, value, onChange },
            fieldState: { error },
          }) => (
            <TextInput
              verticalAlign="top"
              error={!!error?.root}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
              mode="outlined"
              placeholder="Remarks"
              theme={{ roundness: 8 }}
              multiline
              numberOfLines={Platform.OS === "android" ? 5 : undefined}
              textAlignVertical="top"
              style={[
                styles.textMultiline,
                { backgroundColor: theme.colors.surface },
              ]}
            />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
  },
  textMultiline: {
    height: 100,
    paddingVertical: 10,
  },
  formLayoutContainer: {
    gap: 12,
    padding: 20,
    borderRadius: 12,
    flex: 1,
  },
  dateSelectorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 5,
    flex: 1,
    width: "100%",
  },
});
