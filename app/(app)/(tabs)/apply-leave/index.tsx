import ApplyEmployeeLeaveForm, {
  ApplyLeaveInputProps,
  TODAY,
} from "@/components/Forms/ApplyLeave";
import { View } from "@/components/Themed";
import PrimaryButton from "@/ui/primary-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ScrollView, StyleSheet } from "react-native";
import * as zod from "zod";

const leaveRequestSchema = zod
  .object({
    employee: zod.number(),
    start_date: zod.date(),
    end_date: zod.string().date("End date."),
    leave_duration: zod
      .string()
      .min(1, { message: "Leave duration is required." }),
    leave_type: zod.number(),
    remarks: zod.string(),
  })
  .required();

export default function ApplyLeaveScreen() {
  const { control, reset, handleSubmit, register, formState, getValues } =
    useForm<ApplyLeaveInputProps>({
      defaultValues: {
        employee: "",
        start_date: null,
        end_date: null,
        leave_duration: "",
        leave_type: "",
        remarks: "",
      },
      resolver: zodResolver(leaveRequestSchema),
    });

  const onSubmit: SubmitHandler<ApplyLeaveInputProps> = async (data) => {
    console.log("data-->", data);
  };

  console.log("start date", formState.errors.start_date);

  console.log(getValues("start_date"));
  return (
    <View style={styles.screenContainer}>
      <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
        <ApplyEmployeeLeaveForm
          formState={formState}
          register={register}
          control={control}
        />
      </ScrollView>
      <View style={styles.submitButtonContainer}>
        <PrimaryButton onPress={handleSubmit(onSubmit)}>
          Apply Leave
        </PrimaryButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: { flex: 1, marginTop: 10, margin: 5 },
  submitButtonContainer: {
    position: "absolute",
    bottom: 80,
    left: 0,
    right: 0,
    paddingBottom: 10,
    padding: 10,
  },
});
