import Card from "@/components/Common/Card";
import { leaveBalance } from "@/data/leave-balance";
import { Fragment } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, ProgressBar, Text, useTheme } from "react-native-paper";

export default function EmployeeLeaveBalance() {
  const theme = useTheme();
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
        {leaveBalance.map((data, _index) => (
          <Fragment key={_index}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <Text style={styles.label}>{data.type}</Text>
              <Text style={styles.label}>
                {data.balance_string}
                <Text
                  style={{
                    fontFamily: "Poppins_400Regular",
                    color: theme.colors.inverseSurface,
                  }}
                >
                  /{data.total_balance} days
                </Text>
              </Text>
            </View>
            <ProgressBar
              progress={data.balance}
              style={{
                borderRadius: 99,
                height: 20,
              }}
            />
            <Divider />
          </Fragment>
        ))}
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
