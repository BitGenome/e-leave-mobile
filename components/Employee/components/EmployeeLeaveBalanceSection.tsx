import Card from "@/components/Common/Card";
import NotFound from "@/components/Common/NotFound";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, ProgressBar, Text, useTheme } from "react-native-paper";

interface LeaveBalanceDetailsProps {
  available_days: number | null;
  remaining_balance: number;
  leaveType: {
    leave_name: string;
    max_days: number;
  };
  employee: {
    first_name: string;
    last_name: string;
    position: string;
  };
}
interface LeaveBalanceProps {
  leaveBalance: LeaveBalanceDetailsProps[];
}
export default function EmployeeLeaveBalance(props: LeaveBalanceProps) {
  const theme = useTheme();
  const { leaveBalance } = props;

  return (
    <Card
      style={{
        padding: 15,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontFamily: "Poppins_700Bold",
          fontSize: 17,
        }}
      >
        Leave Balance
      </Text>
      <View
        style={{
          gap: 10,
          paddingTop: 10,
        }}
      >
        {leaveBalance.length === 0 ? (
          <NotFound title="Leave balance not found." />
        ) : (
          leaveBalance?.map((data, _index) => (
            <Fragment key={_index}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <Text style={styles.label}>{data.leaveType.leave_name}</Text>
                <Text style={styles.label}>
                  {data.available_days}
                  <Text
                    style={{
                      fontFamily: "Poppins_400Regular",
                      color: theme.colors.inverseSurface,
                    }}
                  >
                    /{data.leaveType.max_days} days
                  </Text>
                </Text>
              </View>
              <ProgressBar
                progress={data.remaining_balance}
                style={{
                  borderRadius: 99,
                  height: 20,
                }}
              />
              <Divider />
            </Fragment>
          ))
        )}
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  label: {
    fontFamily: "Poppins_600SemiBold",
    fontWeight: "600",
  },
});
