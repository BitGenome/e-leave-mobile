import RegisterEmployeeForm from "@/components/Forms/RegisterEmployee";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import useUnsavedChangesWarning from "@/hooks/useUnsaveChangesWarning";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { MD3Theme, useTheme } from "react-native-paper";

export default function RegisterEmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const [text, setText] = useState("");
  const hasUnsavedChanges = Boolean(text);

  useUnsavedChangesWarning({ hasUnsavedChanges });
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          presentation: "modal",
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTitle: () => (
            <TextPoppinsBold>Register Employee</TextPoppinsBold>
          ),
        }}
      />

      <View style={styles.container}>
        <RegisterEmployeeForm />
      </View>
    </>
  );
}

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      padding: 20,
    },
    formContainer: {
      flex: 1,
      gap: 15,
    },
    input: {
      borderBottomLeftRadius: 10,
    },
  });
};
