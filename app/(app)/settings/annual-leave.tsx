import Card from "@/components/Common/Card";
import LeaveBalanceForm from "@/components/Forms/LeaveBalance/LeaveBalance";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View as ScreenView } from "@/components/Themed";
import PrimaryButton from "@/ui/primary-button";
import { ScrollView, StyleSheet, View } from "react-native";
import { Checkbox, useTheme } from "react-native-paper";

export default function AnnualLeaveScreen() {
  const theme = useTheme();
  return (
    <ScreenView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          padding: 10,
        }}
      >
        <View
          style={{
            rowGap: 15,
          }}
        >
          <Card
            style={{
              gap: 10,
              paddingTop: 15,
            }}
          >
            <TextPoppinsBold
              style={{
                textAlign: "center",
              }}
            >
              Select on where to apply the leave balance
            </TextPoppinsBold>
            <Checkbox.Item
              position="leading"
              label={"Apply to all employees"}
              status={"unchecked"}
            />
            <Checkbox.Item
              position="leading"
              label={"Select employee"}
              status={"unchecked"}
            />
          </Card>
          <LeaveBalanceForm />
        </View>
      </ScrollView>
      <View
        style={[
          styles.submitButtonContainer,
          { backgroundColor: theme.colors.background },
        ]}
      >
        <PrimaryButton>Set Leave Balances</PrimaryButton>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  submitButtonContainer: {
    paddingBottom: 10,
    padding: 10,
  },
});
