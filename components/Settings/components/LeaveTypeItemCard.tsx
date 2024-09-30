import { editLeavetype } from "@/api/leave-type/leavetype.service";
import { LeaveBalanceFormInput } from "@/app/(app)/settings/annual-leave";
import { LeaveTypeInputProps } from "@/app/(app)/settings/leave-type";
import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import Card from "@/components/Common/Card";
import LeaveTypeForm from "@/components/Forms/LeaveType/LeaveType";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import Text from "@/ui/typography/regular";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Pressable, StyleSheet, View } from "react-native";
import { Button, TouchableRipple, useTheme } from "react-native-paper";
import { toast } from "sonner-native";

export interface LeaveTypeItemProps {
  id: number;
  leave_name: string;
  leave_description?: string | null;
  max_days: number;
}

export default function LeaveTypeItemCard(props: LeaveTypeItemProps) {
  const { leave_name, leave_description, max_days, id } = props;
  const theme = useTheme();
  const {
    state: isOpenBottomSheetEditLeaveTypeForm,
    toggle,
    setVisibility,
  } = useVisibility({
    defaultVisiblityState: false,
  });

  const { handleSubmit, control, reset } = useForm<LeaveTypeInputProps>({
    defaultValues: {
      name: leave_name,
      description: leave_description ?? "",
      ...props,
    },
  });

  const onSubmit: SubmitHandler<LeaveTypeInputProps> = async (data) => {
    await editLeavetype({ id, ...data });
    toast.success("Success", {
      closeButton: true,
    });
    handleDismiss();
  };

  const handleLongPressItem = useCallback(() => {
    toggle();
  }, [toggle]);

  const handleDismiss = useCallback(() => {
    setVisibility(false);
  }, [setVisibility]);

  return (
    <>
      <TouchableRipple
        rippleColor={theme.colors.primary}
        borderless
        onLongPress={handleLongPressItem}
      >
        <Card style={styles.card}>
          <View style={styles.listItemContainer}>
            <TextPoppinsRegular>Leave type name:</TextPoppinsRegular>
            <TextPoppinsBold>{leave_name}</TextPoppinsBold>
          </View>
          {Boolean(leave_description) && (
            <View style={styles.listItemContainer}>
              <TextPoppinsRegular>Leave type description:</TextPoppinsRegular>
              <TextPoppinsBold>{leave_description}</TextPoppinsBold>
            </View>
          )}
          <View style={styles.listItemContainer}>
            <TextPoppinsRegular>Max days:</TextPoppinsRegular>
            <TextPoppinsBold>{max_days} days</TextPoppinsBold>
          </View>
        </Card>
      </TouchableRipple>
      <BottomSheetViewContainer
        onDismiss={handleDismiss}
        openBottomSheet={isOpenBottomSheetEditLeaveTypeForm}
        snapPoints={["50%"]}
        closeOnPressBackDrop={true}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustResize"
        keyboardBlurBehavior="restore"
      >
        <View
          style={{
            paddingBottom: 10,
            paddingHorizontal: 10,
          }}
        >
          <View style={styles.header}>
            <Button onPress={handleDismiss}>Cancel</Button>
            <TextPoppinsBold
              style={{
                textAlign: "center",
              }}
            >
              Edit leave type
            </TextPoppinsBold>
            <Button onPress={handleSubmit(onSubmit)}>Submit</Button>
          </View>
          <LeaveTypeForm control={control} />
        </View>
      </BottomSheetViewContainer>
    </>
  );
}

const styles = StyleSheet.create({
  card: { padding: 15, marginVertical: 5, marginHorizontal: 5 },
  listItemContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});
