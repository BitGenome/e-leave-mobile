import { requestLeave } from "@/api/leaves-request/leave-request.service";
import ApplyEmployeeLeaveForm, {
  ApplyLeaveInputProps,
} from "@/components/Forms/ApplyLeave";
import { View as ScreenView } from "@/components/Themed";
import { zodResolver } from "@hookform/resolvers/zod";
import { Stack } from "expo-router";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Button } from "react-native-paper";
import { toast } from "sonner-native";
import * as zod from "zod";

const leaveRequestSchema = zod.object({
  employee: zod.number(),
  start_date: zod.date(),
  end_date: zod.date().optional(),
  leave_duration: zod
    .string()
    .min(1, { message: "leave duration is required" }),
  leave_type: zod.number(),
  remarks: zod.string().optional(),
  deducted_leave_type: zod.number().optional(),
});

export default function ApplyLeaveScreen() {
  const { control, reset, handleSubmit, register, formState, setValue, watch } =
    useForm<ApplyLeaveInputProps>({
      defaultValues: {
        deducted_leave_type: "",
        employee: "",
        start_date: undefined,
        end_date: undefined,
        leave_duration: "full_day",
        leave_type: "",
        remarks: "",
      },
      resolver: zodResolver(leaveRequestSchema),
      mode: "onSubmit",
    });

  const onSubmit: SubmitHandler<ApplyLeaveInputProps> = async (data) => {
    try {
      await requestLeave(data);
      toast.success("Sucess", {
        description: `You sucessfully applied leave.`,
      });
      reset();
    } catch (error) {
      // Use 'instanceof' to check if error is of type 'Error'
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
        console.error("ERROR --->", error.message);
      } else {
        // If error is not an instance of Error, handle it as a generic case
        console.error("Unexpected error --->", error);
        toast.error("Unexpected Error", {
          description: "An unexpected error occurred.",
        });
      }
    }
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerTitleAlign: "left",
          headerRight: () => (
            <Button
              style={{
                margin: 5,
              }}
              onPress={handleSubmit(onSubmit)}
            >
              Apply Leave
            </Button>
          ),
        }}
      />

      <ScreenView style={styles.screenContainer}>
        <KeyboardAvoidingView
          style={[styles.screenContainer]}
          keyboardVerticalOffset={3}
          behavior={Platform.OS === "ios" ? "padding" : "height"}
        >
          <ScrollView style={styles.container}>
            <ApplyEmployeeLeaveForm
              watch={watch}
              formState={formState}
              register={register}
              control={control}
              setValue={setValue}
            />
          </ScrollView>
        </KeyboardAvoidingView>
      </ScreenView>
    </>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1 },
  container: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 10,
  },
});
