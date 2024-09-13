import RegisterEmployeeForm from "@/components/Forms/RegisterEmployee";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View } from "@/components/Themed";
import useUnsavedChangesWarning from "@/hooks/useUnsaveChangesWarning";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet } from "react-native";
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
      padding: 20,
      backgroundColor: theme.colors.inverseOnSurface,
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
