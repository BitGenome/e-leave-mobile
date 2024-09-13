import PrimaryButton from "@/ui/primary-button";
import AppTextInput from "@/ui/text-input";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { StyleSheet, View } from "react-native";
import { Button, Text } from "react-native-paper";

export default function LoginForm() {
  const router = useExpoRouter();
  return (
    <View style={styles.loginFormConatiner}>
      <AppTextInput placeholder="Username" />
      <AppTextInput secureTextEntry placeholder="Password" />
      <View
        style={{
          paddingVertical: 10,
          marginTop: 20,
        }}
      >
        <PrimaryButton onPress={() => router.navigate("(tabs)")}>
          Login
        </PrimaryButton>
        <View
          style={{
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flexDirection: "row",
          }}
        >
          <Text variant="bodyMedium" style={{ paddingVertical: 10 }}>
            Not account yet?
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
    gap: 20,
    marginVertical: "10%",
  },
});
