import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import CustomIcon from "@/ui/custom-icon";
import PrimaryButton from "@/ui/primary-button";
import AppTextInput from "@/ui/text-input";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { Control, Controller } from "react-hook-form";
import { GestureResponderEvent, StyleSheet, View } from "react-native";
import {
  Button,
  HelperText,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";

export interface LoginInputProps {
  username: string;
  password: string;
}
interface LoginFormProps {
  control: Control<LoginInputProps>;
  handleSubmit: (e: GestureResponderEvent) => void;
}

export default function LoginForm({ control, handleSubmit }: LoginFormProps) {
  const router = useExpoRouter();
  const { state: isShowPassword, toggle: togglePassword } = useVisibility();
  const theme = useTheme();

  return (
    <View style={styles.loginFormConatiner}>
      <Controller
        control={control}
        name="username"
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <AppTextInput
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!error?.message}
              placeholder="Username"
            />
            <HelperText
              type="error"
              visible={!!error?.message}
              style={{
                color: !!error?.message
                  ? theme.colors.error
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
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              error={!!error?.message}
              secureTextEntry={isShowPassword}
              placeholder="Password"
              right={
                isShowPassword ? (
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
                  ? theme.colors.error
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
        <PrimaryButton onPress={handleSubmit}>Login</PrimaryButton>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text variant="bodyMedium" style={{ paddingVertical: 10 }}>
            Not have an account yet?
          </Text>
          <Button onPress={() => router.navigate("/register")}>
            Register here
          </Button>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  loginFormConatiner: {
    flex: 1,
    marginVertical: "10%",
  },
});
