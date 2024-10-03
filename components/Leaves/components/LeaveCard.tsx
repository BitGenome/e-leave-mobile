import { type leaveStatusType } from "@/api/database/schema";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import { getDurationLabel } from "@/data/time";
import CustomIcon from "@/ui/custom-icon";
import { dateFormatter } from "@/utils/dateFormatter";
import { nameFormatter } from "@/utils/nameFormatter";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Button, Card, Chip, Divider, useTheme } from "react-native-paper";

export interface Employee {
  first_name: string;
  last_name: string;
  employee_no: string;
}

interface LeaveType {
  leave_name: string;
  max_days: number;
  id: number;
}

export interface LeaveCardProps {
  status: leaveStatusType | null;
  leave_duration: string;
  id: number;
  employee: Employee;
  leaveType: LeaveType;
  created_at: Date | null;
  start_date: Date | null;
  end_date: Date | null;
  deductedLeaveRequests: LeaveType;
}

const LEAVE_STATUS = {
  approved: "approved",
  denied: "denied",
  pending: "pending",
};

export const LeaveStatusChip = ({ status }: { status: string }) => {
  const theme = useTheme();

  const statusColors = {
    [LEAVE_STATUS.pending]: theme.colors.tertiary,
    [LEAVE_STATUS.approved]: theme.colors.primary,
    [LEAVE_STATUS.denied]: theme.colors.error,
  };

  return (
    <Chip
      theme={{ roundness: 8 }}
      style={{
        backgroundColor: statusColors[status] || theme.colors.error,
      }}
      textStyle={{
        color: theme.colors.surface,
        textTransform: "uppercase",
      }}
    >
      {status}
    </Chip>
  );
};

const LeaveCard = (props: LeaveCardProps) => {
  const {
    leaveType: type,
    status,
    leave_duration,
    start_date,
    end_date,
    id,
    deductedLeaveRequests: deduct_leavetype,
    employee,
  } = props;
  const router = useRouter();
  const theme = useTheme();

  const handleViewDetailsPress = useCallback(() => {
    return router.navigate({
      pathname: "/(app)/(employee-leaves)/leaves/leave-details/[id]",
      params: {
        id,
      },
    });
  }, [router, id]);

  return (
    <Card
      mode="contained"
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surfaceDisabled,
        },
      ]}
    >
      <Card.Content
        style={{
          rowGap: 10,
        }}
      >
        <View style={styles.contentContainer}>
          <TextPoppinsRegular>Status</TextPoppinsRegular>
          <LeaveStatusChip status={status ?? ""} />
        </View>
        <Divider />
        <View style={styles.contentContainer}>
          <TextPoppinsRegular>Employee no.</TextPoppinsRegular>
          <TextPoppinsBold>{employee.employee_no}</TextPoppinsBold>
        </View>
        <View style={styles.contentContainer}>
          <TextPoppinsRegular>Employee</TextPoppinsRegular>
          <TextPoppinsBold>
            {nameFormatter({
              first_name: employee.first_name,
              last_name: employee.last_name,
            })}
          </TextPoppinsBold>
        </View>
        <View style={styles.contentContainer}>
          <TextPoppinsRegular>Requested leave type</TextPoppinsRegular>
          <TextPoppinsBold>{type.leave_name}</TextPoppinsBold>
        </View>

        <View style={styles.contentContainer}>
          <TextPoppinsRegular>Duration</TextPoppinsRegular>
          <TextPoppinsBold>{getDurationLabel(leave_duration)}</TextPoppinsBold>
        </View>
        {start_date && (
          <View style={styles.contentContainer}>
            <TextPoppinsRegular>Starting date</TextPoppinsRegular>
            <TextPoppinsBold> {dateFormatter(start_date)}</TextPoppinsBold>
          </View>
        )}
        {end_date && (
          <View style={styles.contentContainer}>
            <TextPoppinsRegular>End date</TextPoppinsRegular>
            <TextPoppinsBold> {dateFormatter(end_date)}</TextPoppinsBold>
          </View>
        )}

        {deduct_leavetype.id !== type.id && (
          <View style={styles.contentContainer}>
            <TextPoppinsRegular>Deducted leave balance</TextPoppinsRegular>
            <TextPoppinsBold>{deduct_leavetype.leave_name}</TextPoppinsBold>
          </View>
        )}

        <View
          style={{
            marginTop: 10,
          }}
        >
          <Button
            onPress={handleViewDetailsPress}
            mode="contained"
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
            }}
            textColor={theme.colors.surface}
            contentStyle={{
              height: 55,
            }}
          >
            <View style={styles.viewDetailsContainer}>
              <TextPoppinsRegular
                style={{
                  color: theme.colors.surface,
                }}
              >
                View Details
              </TextPoppinsRegular>
              <CustomIcon
                style={{
                  marginLeft: 10,
                }}
                size={20}
                color={theme.colors.surface}
                name="arrowright"
              />
            </View>
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default memo(LeaveCard);
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginVertical: 5,
  },
  cardTitle: {
    display: "flex",
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
  },
  viewDetailsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flex: 1,
  },
  contentContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
