import { IInputFieldProps } from "@/app/(app)/settings/security";
import CustomIcon from "@/ui/custom-icon";
import AppTextInput from "@/ui/text-input";
import { Control, Controller } from "react-hook-form";
import { StyleSheet } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";
import { View } from "../Themed";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";

interface SecurityFormProps {
  control: Control<IInputFieldProps>;
}

export default function SecurityForm({ control }: SecurityFormProps) {
  const theme = useTheme();
  const { state: isVisibleOldPassword, toggle: oldPasswordToggle } =
    useVisibility();
  const { state: isVisibleNewPassword, toggle: newPasswordToggle } =
    useVisibility();
  const { state: isVisibleConfirmPassword, toggle: confirmPasswordToggle } =
    useVisibility();

  return (
    <View
      style={[styles.formContainer, { backgroundColor: theme.colors.surface }]}
    >
      <Controller
        control={control}
        name="oldPassword"
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <>
            <AppTextInput
              placeholder="Old password"
              secureTextEntry={isVisibleOldPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.oldPassword}
              outlineStyle={{ borderWidth: 0 }}
              right={
                isVisibleOldPassword ? (
                  <TextInput.Icon
                    onPress={oldPasswordToggle}
                    icon={() => <CustomIcon name="eye-off" library="ionic" />}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={oldPasswordToggle}
                    icon={() => <CustomIcon name="eye" library="ionic" />}
                  />
                )
              }
            />
            {errors.oldPassword && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.oldPassword?.message}
              </Text>
            )}
          </>
        )}
      />

      <Controller
        control={control}
        name="newPassword"
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <>
            <AppTextInput
              placeholder="New password"
              secureTextEntry={isVisibleNewPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.newPassword}
              outlineStyle={{ borderWidth: 0 }}
              right={
                isVisibleNewPassword ? (
                  <TextInput.Icon
                    onPress={newPasswordToggle}
                    icon={() => <CustomIcon name="eye-off" library="ionic" />}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={newPasswordToggle}
                    icon={() => <CustomIcon name="eye" library="ionic" />}
                  />
                )
              }
            />
            {errors.newPassword && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.newPassword.message}
              </Text>
            )}
          </>
        )}
      />

      {/* Confirm Password */}
      <Controller
        control={control}
        name="confirmPassword"
        render={({
          field: { onChange, onBlur, value },
          formState: { errors },
        }) => (
          <>
            <AppTextInput
              placeholder="Confirm password"
              secureTextEntry={isVisibleConfirmPassword}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!errors.confirmPassword}
              outlineStyle={{ borderWidth: 0 }}
              right={
                isVisibleConfirmPassword ? (
                  <TextInput.Icon
                    onPress={confirmPasswordToggle}
                    icon={() => <CustomIcon name="eye-off" library="ionic" />}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={confirmPasswordToggle}
                    icon={() => <CustomIcon name="eye" library="ionic" />}
                  />
                )
              }
            />
            {errors.confirmPassword && (
              <Text style={[styles.errorText, { color: theme.colors.error }]}>
                {errors.confirmPassword.message}
              </Text>
            )}
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    marginTop: "30%",
    margin: 15,
    padding: 20,
    paddingVertical: 40,
    borderRadius: 25,
    rowGap: 10,
  },
  errorText: {
    fontSize: 12,
    marginTop: -10,
  },
});
