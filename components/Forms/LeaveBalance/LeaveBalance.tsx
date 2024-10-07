import { useLeaveTypeData } from "@/api/leave-type/use-leave-type-data";
import { type LeaveBalanceFormInput } from "@/app/(app)/settings/annual-leave";
import Card from "@/components/Common/Card";
import { CenteredView } from "@/components/Common/CenteredView";
import { Loading } from "@/components/Common/Loading";
import NotFound from "@/components/Common/NotFound";
import CustomIcon from "@/ui/custom-icon";
import AppTextInput from "@/ui/text-input";
import { useFocusEffect } from "expo-router";
import React, { useCallback } from "react";
import { Control, Controller, UseFormRegister } from "react-hook-form";
import { StyleSheet, View, StyleProp } from "react-native";
import { Divider, HelperText, IconButton, TextInput } from "react-native-paper";

interface LeaveType {
  name: string;
  label: string;
  balance: number;
  id: number;
  control?: Control<LeaveBalanceFormInput>;
  register?: UseFormRegister<LeaveBalanceFormInput>;
}

const LeaveBalanceItem: React.FC<{
  leaveType: LeaveType;
  index: number;
  control: Control<LeaveBalanceFormInput>;
  register: UseFormRegister<LeaveBalanceFormInput>;
}> = ({ leaveType, index, control, register }) => {
  /** need to include the name and id of leave type upon submit */
  useFocusEffect(
    useCallback(() => {
      register(`leaveTypes.${index}.id`, { value: leaveType.id });
      register(`leaveTypes.${index}.name`, { value: leaveType.name });
    }, [register, leaveType.id, leaveType.name, index])
  );

  return (
    <View style={styles.itemContainer}>
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        {leaveType.label}
      </HelperText>
      <View style={styles.inputContainer}>
        <Controller
          defaultValue={leaveType.balance} // Set default values
          name={`leaveTypes.${index}.balance`}
          control={control}
          render={({ field: { value, onChange } }) => (
            <>
              <AppTextInput
                style={styles.input}
                mode="outlined"
                placeholder={leaveType.label}
                value={value.toString()}
                readOnly
                keyboardType="numeric"
                right={<TextInput.Affix text="/days" />}
              />
              <View style={styles.buttonContainer}>
                <IconButton
                  disabled={value === 0}
                  onPress={() => onChange(value - 1)} // Decrement the value
                  mode="outlined"
                  style={styles.iconButton}
                  icon={(props) => <CustomIcon name="minus" {...props} />}
                />
                <IconButton
                  onPress={() => onChange(value + 1)} // Increment the value
                  mode="outlined"
                  style={styles.iconButton}
                  icon={(props) => <CustomIcon name="plus" {...props} />}
                />
              </View>
            </>
          )}
        />
      </View>
    </View>
  );
};

interface LeaveFormProps {
  control: Control<LeaveBalanceFormInput>;
  /**use for register for react hook form */
  register: UseFormRegister<LeaveBalanceFormInput>;
}

export default function LeaveBalanceForm(props: LeaveFormProps) {
  const { data, isLoading } = useLeaveTypeData();
  const leaveTypeData = data?.map((type) => ({
    id: type.id,
    name: type.leave_name,
    label: type.leave_name,
    balance: 0,
  }));

  if (isLoading) return <Loading />;

  if (!data || data.length === 0)
    return <NotFound title="You have not added yet a leave type." />;

  return (
    <Card style={styles.container}>
      {leaveTypeData?.map((leaveType, index) => (
        <React.Fragment key={leaveType.name}>
          <LeaveBalanceItem
            register={props.register}
            leaveType={leaveType}
            control={props.control}
            index={index}
          />
          {index < leaveTypeData?.length - 1 && (
            <Divider style={styles.divider} />
          )}
        </React.Fragment>
      ))}
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    marginBottom: 40,
  },
  itemContainer: {
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
    flex: 1,
    marginRight: 10,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 10,
  },
  iconButton: {
    margin: 0,
  },
  label: {
    fontWeight: "700",
    fontFamily: "Poppins_500Medium",
    marginBottom: 5,
  },
  divider: {
    marginVertical: 10,
  },
});
