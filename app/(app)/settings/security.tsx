import SecurityForm from "@/components/Forms/Security";
import PrimaryButton from "@/ui/primary-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

import { Alert, KeyboardAvoidingView, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import * as zod from "zod";

export interface IInputFieldProps {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const securitySchema = zod
  .object({
    oldPassword: zod
      .string()
      .min(1, { message: "Old password field is required." }),
    newPassword: zod
      .string({ required_error: "New password field is required." })
      .min(5, { message: "New password field is minimum of 5 characters." }),
    confirmPassword: zod
      .string({ required_error: "Confirm password field is required." })
      .min(5, {
        message: "Confirm password field is minimum of 5 characters.",
      }),
  })
  .required()
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "The new password did not match",
        path: ["confirmPassword"],
      });
    }
  });

export default function SecurityScreen() {
  const theme = useTheme();
  const { control, handleSubmit, formState } = useForm<IInputFieldProps>({
    defaultValues: {
      oldPassword: "",
      confirmPassword: "",
      newPassword: "",
    },
    resolver: zodResolver(securitySchema),
  });

  const onSubmit: SubmitHandler<IInputFieldProps> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second submission delay
    Alert.alert(
      "Form Submitted",
      `First Name: ${data.oldPassword}\nLast Name: ${data.oldPassword}\nPosition: ${data.confirmPassword}`
    );
    console.log(data);
  };
  return (
    <KeyboardAvoidingView style={{ flex: 1 }}>
      <View
        style={[
          styles.container,
          {
            backgroundColor: theme.colors.inverseOnSurface,
          },
        ]}
      >
        <View>
          <SecurityForm control={control} />
        </View>

        <PrimaryButton
          disabled={formState.isSubmitting}
          loading={formState.isSubmitting}
          style={styles.submit}
          onPress={handleSubmit(onSubmit)}
        >
          Change password
        </PrimaryButton>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submit: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    marginHorizontal: 10,
    marginBottom: 10,
  },
});
