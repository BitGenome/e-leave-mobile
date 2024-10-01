import { useLeaveBalanceDataByEmployee } from "@/api/leave-balance/use-leave-balance";
import EmployeeDetails from "@/components/Employee/components/EmployeeDetails";
import EmployeeLeaveBalance from "@/components/Employee/components/EmployeeLeaveBalanceSection";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View as ScreenView } from "@/components/Themed";
import PrimaryButton from "@/ui/primary-button";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import { ScrollView, View, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function EmployeeDetailScreen() {
  const theme = useTheme();
  const router = useRouter();
  const { name, id } = useLocalSearchParams<{ id: string; name: string }>();

  const { data: leaveBalancesData } = useLeaveBalanceDataByEmployee({
    id: +id,
  });

  return (
    <ScreenView style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: "Employee Details",
          headerTitle: () => (
            <TextPoppinsBold
              style={{
                textTransform: "capitalize",
              }}
            >
              {name} Details
            </TextPoppinsBold>
          ),
        }}
      />

      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.content}>
          <EmployeeLeaveBalance leaveBalance={leaveBalancesData} />
          <EmployeeDetails {...leaveBalancesData[0]?.employee} />
        </View>
      </ScrollView>

      {/* Fixed bottom button */}
      <View
        style={[
          styles.buttonContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <PrimaryButton
          onPress={() => router.navigate("/(app)/(tabs)/apply-leave")}
        >
          Apply leave
        </PrimaryButton>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    paddingBottom: 100, // Make room for the button at the bottom
  },
  content: {
    margin: 10,
    rowGap: 10,
  },
  buttonContainer: {
    width: "100%",
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
});
