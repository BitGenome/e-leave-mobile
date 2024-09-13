import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { Stack, useLocalSearchParams } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function EmployeeDetailScreen() {
  const { name } = useLocalSearchParams();

  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Employee Details",
          headerTitle: () => (
            <TextPoppinsBold> {name} Details </TextPoppinsBold>
          ),
        }}
      />
      <Text>detaials employee</Text>
    </View>
  );
}
