import { addLeaveType } from "@/api/leave-type/leavetype.service";
import { useLeaveTypeData } from "@/api/leave-type/use-leave-type-data";
import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import NotFound from "@/components/Common/NotFound";
import LeaveTypeForm from "@/components/Forms/LeaveType/LeaveType";
import LeaveTypeItemCard, {
  type LeaveTypeItemProps,
} from "@/components/Settings/components/LeaveTypeItemCard";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { View as ScreenView } from "@/components/Themed";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import { FlashList, ListRenderItem } from "@shopify/flash-list";
import { Stack } from "expo-router";
import { useCallback } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Button } from "react-native-paper";
import { toast } from "sonner-native";

export interface LeaveTypeInputProps {
  name: string;
  description?: string | null;
  max_days: number;
}

const renderLeaveTypeItem: ListRenderItem<LeaveTypeItemProps> = ({
  item,
}: {
  item: LeaveTypeItemProps;
}) => {
  return <LeaveTypeItemCard {...item} />;
};

export default function LeaveTypeScreen() {
  const { data: leaveTypeData } = useLeaveTypeData();
  const { state, toggle, setVisibility } = useVisibility({
    defaultVisiblityState: false,
  });
  const { control, handleSubmit, reset } = useForm<LeaveTypeInputProps>({
    defaultValues: {
      name: "",
      description: "",
      max_days: 0,
    },
  });

  const handleDismissBottomSheet = useCallback(() => {
    setVisibility(false);
  }, []);

  const onSubmit: SubmitHandler<LeaveTypeInputProps> = async (data) => {
    await addLeaveType(data);
    toast.success("Successfully added leave type");
    reset();
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerRight: () => <Button onPress={toggle}>Add leave type</Button>,
        }}
      />
      <ScreenView style={styles.screenView}>
        <View
          style={{
            flex: 1,
            paddingTop: 5,
          }}
        >
          <FlashList
            estimatedItemSize={10}
            data={leaveTypeData}
            renderItem={renderLeaveTypeItem}
            keyExtractor={(item) => item.id.toString()}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={<NotFound title="No leave type added yet." />}
          />
        </View>
      </ScreenView>
      <BottomSheetViewContainer
        snapPoints={["50%"]}
        closeOnPressBackDrop={false}
        keyboardBehavior="interactive"
        android_keyboardInputMode="adjustPan"
        openBottomSheet={state}
        onDismiss={handleDismissBottomSheet}
        keyboardBlurBehavior="restore"
      >
        <View style={styles.container}>
          <View style={styles.header}>
            <Button onPress={handleDismissBottomSheet}>Cancel</Button>
            <TextPoppinsBold
              style={{
                textAlign: "center",
              }}
            >
              Add leave type
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
  screenView: {
    flex: 1,
  },
  container: { minHeight: 100, paddingHorizontal: 20, paddingBottom: 20 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingBottom: 10,
  },
});
