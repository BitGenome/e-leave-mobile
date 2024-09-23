import EmployeeDetails from "@/components/Employee/components/EmployeeDetails";
import EmployeeLeaveBalance from "@/components/Employee/components/EmployeeLeaveBalanceSection";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View as ScreenView } from "@/components/Themed";
import { Stack, useLocalSearchParams } from "expo-router";
import { Dimensions, ScrollView, View } from "react-native";

export default function EmployeeDetailScreen() {
  const { name } = useLocalSearchParams();
  const height = Dimensions.get("screen").height;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}
    >
      <ScreenView
        style={{
          minHeight: height,
          flex: 1,
        }}
      >
        <Stack.Screen
          options={{
            headerShown: true,
            title: "Employee Details",
            headerTitle: () => (
              <TextPoppinsBold> {name} Details </TextPoppinsBold>
            ),
          }}
        />

        <View
          style={{
            margin: 10,
            rowGap: 10,
          }}
        >
          <EmployeeLeaveBalance />
          <EmployeeDetails />
        </View>
      </ScreenView>
    </ScrollView>
  );
}
