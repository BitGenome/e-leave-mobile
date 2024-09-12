import { position } from "@/data/position";
import useUnsavedChangesWarning from "@/hooks/useUnsaveChangesWarning";
import PrimaryButton from "@/ui/primary-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { Alert, StyleSheet, View } from "react-native";
import { HelperText, MD3Theme, TextInput, useTheme } from "react-native-paper";
import * as zod from "zod";
import BottomSheetSelectTest, {
  type SelectValue,
} from "../BottomSheetSelect/BottomSheetSelect";

interface IFormInput {
  employee_no: string;
  firstname: string;
  lastname: string;
  position: SelectValue;
}

const registerEmployeeSchema = zod
  .object({
    firstname: zod.string().min(1, { message: "First name is required." }),
    lastname: zod.string().min(1, { message: "Last name is required." }),
    employee_no: zod.string().min(1, { message: "Employee no. is required." }),
    position: zod
      .string()
      .min(1, { message: "Employee position is required." }),
  })
  .required();

export default function RegisterEmployeeForm() {
  const theme = useTheme();
  const { formState, handleSubmit, control } = useForm<IFormInput>({
    defaultValues: {
      employee_no: "",
      firstname: "",
      lastname: "",
      position: undefined,
    },
    resolver: zodResolver(registerEmployeeSchema),
  });
  const styles = createStyles(theme);
  useUnsavedChangesWarning({ hasUnsavedChanges: formState.isDirty });

  const onSubmit: SubmitHandler<IFormInput> = async (data) => {
    await new Promise((resolve) => setTimeout(resolve, 3000)); // Simulate a 3-second submission delay
    Alert.alert(
      "Form Submitted",
      `First Name: ${data.firstname}\nLast Name: ${data.lastname}\nPosition: ${data.position}`
    );
    console.log(data);
  };

  return (
    <View
      style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}
    >
      <Controller
        control={control}
        name="employee_no"
        render={({ field }) => (
          <View>
            <TextInput
              mode="outlined"
              placeholder="Employee no."
              theme={{ roundness: 8 }}
              style={styles.input}
              {...field}
              onBlur={field.onBlur}
              onChangeText={field.onChange}
            />
            <HelperText type="error" visible={!!formState.errors.employee_no}>
              {formState?.errors?.employee_no?.message}
            </HelperText>
          </View>
        )}
      />

      <Controller
        control={control}
        name="firstname"
        render={({ field }) => (
          <>
            <TextInput
              mode="outlined"
              placeholder="First name"
              theme={{ roundness: 8 }}
              style={styles.input}
              onChangeText={field.onChange}
              {...field}
            />
            <HelperText type="error" visible={!!formState.errors.firstname}>
              {formState?.errors?.firstname?.message}
            </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="lastname"
        render={({ field }) => (
          <>
            <TextInput
              mode="outlined"
              placeholder="Last name"
              style={styles.input}
              theme={{ roundness: 8 }}
              onChangeText={field.onChange}
              {...field}
            />
            <HelperText type="error" visible={!!formState.errors.lastname}>
              {formState?.errors?.lastname?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="position"
        render={({ field }) => (
          <>
            <BottomSheetSelectTest
              label={"Select position"}
              options={position}
              onSelect={field.onChange}
              snapPoint={["35%", "50%"]}
              {...field}
            />
            <HelperText type="error" visible={!!formState.errors.position}>
              {formState?.errors?.position?.message}
            </HelperText>
          </>
        )}
      />

      <PrimaryButton
        disabled={formState.isSubmitting}
        loading={formState.isSubmitting}
        theme={{ roundness: 3 }}
        onPress={handleSubmit(onSubmit)}
      >
        Save employee
      </PrimaryButton>
    </View>
  );
}
const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    formContainer: {
      gap: 5,
      borderRadius: 25,
      padding: 20,
      paddingVertical: 40,
    },
    submit: {
      marginTop: 20,
      textAlignVertical: "center",
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
    },
    contentContainer: {
      flex: 1,
      padding: 5,
    },
    itemContent: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceDisabled,
      margin: 6,
    },
  });
};
