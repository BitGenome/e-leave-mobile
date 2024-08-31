import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Text } from "react-native-paper";

export default function EmployeeDetailScreen() {
  return (
    <View>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: () => (
            <TextPoppinsBold>Employee Detail </TextPoppinsBold>
          ),
        }}
      />
      <Text>detaials employee</Text>
    </View>
  );
}
