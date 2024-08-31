import CustomBackdrop from "@/components/BackDrop/CustomBackdrop";
import RegisterEmployeeForm from "@/components/Employee/Forms/RegisterEmployee";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { BottomSheetModal, BottomSheetView } from "@gorhom/bottom-sheet";
import { Stack } from "expo-router";
import { useCallback, useMemo, useRef } from "react";
import { StyleSheet, View } from "react-native";
import { Button, MD3Theme, Text, useTheme } from "react-native-paper";

export default function RegisterEmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ["25%", "50%"], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);
  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <TextPoppinsBold>Register Employee</TextPoppinsBold>
          ),
        }}
      />
      <View style={styles.container}>
        <RegisterEmployeeForm />
        <Button onPress={handlePresentModalPress}>Prees me</Button>
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}
          backdropComponent={CustomBackdrop}
        >
          <BottomSheetView style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </BottomSheetView>
        </BottomSheetModal>
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
    contentContainer: {
      flex: 1,
      alignItems: "center",
    },
    input: {
      borderBottomLeftRadius: 10,
    },
  });
};
