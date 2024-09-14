import PrimaryButton from "@/ui/primary-button";
import AppTextInput from "@/ui/text-input";
import Text from "@/ui/typography/regular";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import { Button, HelperText, TextInput, useTheme } from "react-native-paper";
import { LoginInputProps } from "./Login";
import { Control, Controller } from "react-hook-form";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import CustomIcon from "@/ui/custom-icon";

export interface RegisterInputProps extends LoginInputProps {
  confirm_password: string;
}
interface RegisterFormProps {
  control: Control<RegisterInputProps>;
  handleSubmit: (e: GestureResponderEvent) => void;
}

export default function RegisterForm({
  control,
  handleSubmit,
}: RegisterFormProps) {
  const router = useExpoRouter();
  const theme = useTheme();
  const { state: isPasswordVisible, toggle: togglePassword } = useVisibility();
  const { state: isConfirmPasswordVisible, toggle: toggleConfirmPassword } =
    useVisibility();

  const ERROR_COLOR = theme.colors.error;

  return (
    <View style={styles.formContainer}>
      <Controller
        control={control}
        name="username"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={!!error}
              placeholder="Username"
              right={
                <TextInput.Icon
                  icon={({ color = theme.colors.primary, ...props }) => (
                    <CustomIcon name="user" {...props} />
                  )}
                />
              }
            />
            <HelperText
              type="error"
              visible={!!error?.message}
              style={{
                color: !!error?.message
                  ? ERROR_COLOR
                  : theme.colors.elevation.level0,
              }}
            >
              {error?.message}
            </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppTextInput
              onChangeText={onChange}
              onBlur={onBlur}
              value={value}
              error={!!error}
              placeholder="Password"
              secureTextEntry={isPasswordVisible}
              right={
                isPasswordVisible ? (
                  <TextInput.Icon
                    onPress={togglePassword}
                    icon={() => <CustomIcon name="eye-off" library="ionic" />}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={togglePassword}
                    icon={() => <CustomIcon name="eye" library="ionic" />}
                  />
                )
              }
            />
            <HelperText
              type="error"
              visible={!!error?.message}
              style={{
                color: !!error?.message
                  ? ERROR_COLOR
                  : theme.colors.elevation.level0,
              }}
            >
              {error?.message}
            </HelperText>
          </>
        )}
      />

      <Controller
        control={control}
        name="confirm_password"
        render={({
          field: { onBlur, value, onChange },
          fieldState: { error },
        }) => (
          <>
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!error}
              placeholder="Confirm password"
              secureTextEntry={isConfirmPasswordVisible}
              right={
                isConfirmPasswordVisible ? (
                  <TextInput.Icon
                    onPress={toggleConfirmPassword}
                    icon={() => <CustomIcon name="eye-off" library="ionic" />}
                  />
                ) : (
                  <TextInput.Icon
                    onPress={toggleConfirmPassword}
                    icon={() => <CustomIcon name="eye" library="ionic" />}
                  />
                )
              }
            />
            <HelperText
              type="error"
              visible={!!error?.message}
              style={{
                color: !!error?.message
                  ? ERROR_COLOR
                  : theme.colors.elevation.level0,
              }}
            >
              {error?.message}
            </HelperText>
          </>
        )}
      />
      <View
        style={{
          paddingVertical: 10,
          marginTop: 20,
        }}
      >
        <PrimaryButton onPress={handleSubmit}>Register</PrimaryButton>
        <View
          style={{
            alignItems: "center",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text>Already have an account?</Text>
          <Button onPress={() => router.navigate("login")}>Login here</Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    padding: 10,
    gap: 2,
  },
});
