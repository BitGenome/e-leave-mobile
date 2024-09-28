import { useEmployeeData } from "@/api/employees/use-employee-data";
import { addLeaveBalance } from "@/api/leave-balance/leave-balance.service";
import { useLeaveTypeData } from "@/api/leave-type/use-leave-type-data";
import BottomSheetSelect from "@/components/BottomSheet/BottomSheetSelect/BottomSheetSelect";
import Card from "@/components/Common/Card";
import LeaveBalanceForm from "@/components/Forms/LeaveBalance/LeaveBalance";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View as ScreenView } from "@/components/Themed";
import PrimaryButton from "@/ui/primary-button";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";
import { toast } from "sonner-native";

type SelectedLeaveBalanceOption = "ALL_EMPLOYEE" | "SELECTED_EMPLOYEE";
export type LeaveBalanceFormInput = {
  employee_id?: number;
  leaveTypes: {
    id: number;
    name: string;
    label: string;
    balance: number;
  }[];
};

const SELECTEDBALANCETYPE: Record<
  SelectedLeaveBalanceOption,
  SelectedLeaveBalanceOption
> = {
  ALL_EMPLOYEE: "ALL_EMPLOYEE",
  SELECTED_EMPLOYEE: "SELECTED_EMPLOYEE",
};

export default function AnnualLeaveScreen() {
  const theme = useTheme();
  const { data } = useEmployeeData();
  const { data: leaveTypeData } = useLeaveTypeData();

  const dataLeaveType = leaveTypeData?.map((type) => ({
    name: type.leave_name,
    balance: 0,
    id: type.id,
    label: type.leave_name,
  }));

  const [selectedOption, setSelectedOption] =
    useState<SelectedLeaveBalanceOption>(SELECTEDBALANCETYPE.ALL_EMPLOYEE);
  const [selectedEmployee, setSelectedEmployee] = useState<number | undefined>(
    undefined
  );

  const { control, handleSubmit, register, reset } =
    useForm<LeaveBalanceFormInput>({
      defaultValues: {
        leaveTypes: dataLeaveType ?? [],
      },
    });

  /** convert the employee obj to {label: `value` value: `value`} */
  const employeeData = data?.map((employee) => ({
    label: `${employee.first_name} ${employee.last_name}`,
    value: employee.employee_id,
  }));

  const onSubmit: SubmitHandler<LeaveBalanceFormInput> = async (data) => {
    /** Before submit transform the data to show if is for all employee or not */
    const dataToSubmit = {
      leaveBalances: data,
      employee: selectedEmployee,
    };
    await addLeaveBalance(dataToSubmit);
    toast.success("Success adding leave balances ");
    reset();
  };

  return (
    <ScreenView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.selectBalanceContainer}>
          <Card style={styles.card}>
            <TextPoppinsBold
              style={{
                textAlign: "center",
              }}
            >
              Select on where to apply the leave balance
            </TextPoppinsBold>
            <Checkbox.Item
              onPress={() =>
                setSelectedOption(SELECTEDBALANCETYPE.ALL_EMPLOYEE)
              }
              position="leading"
              label={"Apply to all employees"}
              status={
                selectedOption === SELECTEDBALANCETYPE.ALL_EMPLOYEE
                  ? "checked"
                  : "unchecked"
              }
            />
            <Checkbox.Item
              position="leading"
              label={"Select employee"}
              onPress={() =>
                setSelectedOption(SELECTEDBALANCETYPE.SELECTED_EMPLOYEE)
              }
              status={
                selectedOption === SELECTEDBALANCETYPE.SELECTED_EMPLOYEE
                  ? "checked"
                  : "unchecked"
              }
            />
            {selectedOption === SELECTEDBALANCETYPE.SELECTED_EMPLOYEE && (
              <View style={styles.containerEmployeeSelect}>
                <BottomSheetSelect
                  label="Employee name"
                  options={employeeData}
                  onSelect={(data) => setSelectedEmployee(+data)}
                  header="Employee name"
                />
              </View>
            )}
          </Card>
          <LeaveBalanceForm control={control} register={register} />
        </View>
      </ScrollView>
      <View
        style={[
          styles.submitButtonContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <PrimaryButton onPress={handleSubmit(onSubmit)}>
          Set Leave Balances
        </PrimaryButton>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButtonContainer: {
    paddingBottom: 10,
    padding: 10,
  },
  card: {
    gap: 10,
    paddingTop: 15,
  },
  scrollView: {
    padding: 10,
  },
  selectBalanceContainer: {
    rowGap: 15,
  },
  containerEmployeeSelect: {
    paddingLeft: 20,
    paddingRight: 15,
    paddingBottom: 10,
  },
});
