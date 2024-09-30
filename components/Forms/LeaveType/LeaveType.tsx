import { LeaveTypeInputProps } from "@/app/(app)/settings/leave-type";
import CustomIcon from "@/ui/custom-icon";
import { BottomSheetTextInput } from "@gorhom/bottom-sheet";
import { Control, Controller } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { HelperText, IconButton, useTheme } from "react-native-paper";

interface LeaveTypeFormProps {
  control: Control<LeaveTypeInputProps>;
}

export default function LeaveTypeForm(props: LeaveTypeFormProps) {
  const theme = useTheme();
  return (
    <View
      style={{
        gap: 10,
      }}
    >
      <Controller
        control={props.control}
        name="name"
        rules={{
          required: true,
        }}
        render={({
          field: { onBlur, onChange, value },
          fieldState: { error },
        }) => (
          <>
            <HelperText variant="labelMedium" type="info">
              Leave type name
            </HelperText>
            <BottomSheetTextInput
              style={[
                styles.textInput,
                {
                  borderColor: error ? theme.colors.error : undefined,
                  backgroundColor: theme.colors.surface,
                },
              ]}
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
              placeholder="Name"
            />
          </>
        )}
      />

      <Controller
        control={props.control}
        name="description"
        render={({ field: { onChange, value, onBlur } }) => (
          <>
            <HelperText variant="labelMedium" type="info">
              Leave description
            </HelperText>
            <BottomSheetTextInput
              style={[
                styles.textInput,
                {
                  backgroundColor: theme.colors.surface,
                },
              ]}
              onChangeText={onChange}
              value={value ?? ""}
              onBlur={onBlur}
              placeholder="Description"
            />
          </>
        )}
      />

      <Controller
        control={props.control}
        name="max_days"
        render={({ field: { onChange, value } }) => (
          <>
            <HelperText variant="labelMedium" type="info">
              Leave max days
            </HelperText>
            <View
              style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <BottomSheetTextInput
                placeholder="Max days"
                value={value.toString()}
                style={[
                  styles.textInput,
                  {
                    flex: 1,
                    color: theme.colors.primary,
                    backgroundColor: theme.colors.surface,
                  },
                ]}
                readOnly
              />
              <IconButton
                disabled={value === 0}
                onPress={() => onChange(value - 1)} // Decrement the value
                mode="outlined"
                style={styles.iconButton}
                icon={(props) => <CustomIcon name="minus" {...props} />}
              />
              <IconButton
                onPress={() => onChange(value + 1)} // Increment the value
                mode="outlined"
                style={styles.iconButton}
                icon={(props) => <CustomIcon name="plus" {...props} />}
              />
            </View>
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  iconButton: {
    margin: 5,
  },
  textInput: {
    borderWidth: 1,
    alignSelf: "stretch",
    marginHorizontal: 12,
    marginBottom: 12,
    padding: 12,
    borderRadius: 12,
  },
});
