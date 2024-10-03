import { LeaveRequestApproveOrReject } from "@/api/leaves-request/leave-request.service";
import { useLeaveRequestId } from "@/api/leaves-request/use-leave-request";
import NotFound from "@/components/Common/NotFound";
import { LeaveStatusChip } from "@/components/Leaves/components/LeaveCard";
import { View as ScreenView } from "@/components/Themed";
import { getDurationLabel } from "@/data/time";
import PrimaryButton from "@/ui/primary-button";
import SecondaryButton from "@/ui/secondary-button";
import { dateFormatter } from "@/utils/dateFormatter";
import { useLocalSearchParams } from "expo-router";
import React, { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Divider, Text, TextInput, useTheme } from "react-native-paper";
import { toast } from "sonner-native";

const DetailItem = ({ label, content }: { label: string; content: string }) => (
  <View>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.contentText}>{content}</Text>
  </View>
);

export default function LeaveDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const { data: leaveRequestData, error } = useLeaveRequestId({
    id: parseInt(id),
  });
  const theme = useTheme();

  const handleApprovedRequest = useCallback(async () => {
    try {
      await LeaveRequestApproveOrReject(+id, true);
      toast.success("Success", {
        description: ``,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
        return;
      }
      toast.error("Error", {
        description: "Unexpected error",
      });
      return;
    }
  }, [id, toast]);

  const handleRejectRequest = useCallback(async () => {
    try {
      await LeaveRequestApproveOrReject(+id, false);
      toast.success("Success", {
        description: ``,
      });
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
        return;
      }
      toast.error("Error", {
        description: "Unexpected error",
      });
      return;
    }
  }, [id, toast]);

  if (error) {
    return (
      <ScreenView style={styles.centerContainer}>
        <Text>Error: {error.message || "An unexpected error occurred"}</Text>
      </ScreenView>
    );
  }

  if (!leaveRequestData) {
    return (
      <ScreenView style={styles.centerContainer}>
        <NotFound />
      </ScreenView>
    );
  }

  const {
    status,
    created_at,
    leaveType,
    remark,
    leave_duration,
    start_date,
    end_date,
  } = leaveRequestData;

  return (
    <ScreenView style={styles.screenContainer}>
      <View
        style={[styles.container, { backgroundColor: theme.colors.background }]}
      >
        <View style={{ alignItems: "flex-start" }}>
          <Text style={styles.label}>Application Status</Text>
          <LeaveStatusChip status={status ?? ""} />
        </View>
        <Divider />
        <DetailItem
          label="Date of Application"
          content={dateFormatter(created_at)}
        />
        <Divider />
        <DetailItem label="Type of Leave" content={leaveType.leave_name} />
        <Divider />
        <DetailItem
          label="Duration"
          content={getDurationLabel(leave_duration)}
        />
        <DetailItem
          label="Inclusive Date"
          content={`${dateFormatter(start_date)}${
            end_date ? ` - ${dateFormatter(end_date)}` : ""
          }`}
        />
        {remark && (
          <View>
            <Text style={styles.label}>Remarks</Text>
            <TextInput
              readOnly
              mode="outlined"
              style={{ minHeight: 100 }}
              theme={{ roundness: 10 }}
              multiline
              value={remark}
              outlineStyle={{ borderColor: theme.colors.elevation.level3 }}
            />
          </View>
        )}
      </View>
      {status === "pending" && (
        <View style={styles.submitContainer}>
          <PrimaryButton onPress={handleApprovedRequest}>
            Approved
          </PrimaryButton>
          <SecondaryButton onPress={handleRejectRequest}>
            Reject
          </SecondaryButton>
        </View>
      )}
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screenContainer: { flex: 1, padding: 10, justifyContent: "space-between" },
  centerContainer: { flex: 1, justifyContent: "center", alignItems: "center" },
  label: { fontFamily: "Poppins_400Regular" },
  contentText: { fontFamily: "Poppins_600SemiBold" },
  submitContainer: { gap: 10, padding: 10, width: "100%" },
  container: { gap: 30, padding: 15, marginTop: 10, borderRadius: 15 },
});
