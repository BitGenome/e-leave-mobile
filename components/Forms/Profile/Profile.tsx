import { type IProfile } from "@/app/(app)/settings/profile";
import BottomSheetSelect from "@/components/BottomSheet/BottomSheetSelect/BottomSheetSelect";
import { position } from "@/data/position";
import AppTextInput from "@/ui/text-input";
import { Control, Controller } from "react-hook-form";
import { View } from "react-native";
import { HelperText, useTheme } from "react-native-paper";

interface EditProfileFormProps {
  control: Control<IProfile>;
}

export default function EditProfileForm({ control }: EditProfileFormProps) {
  const theme = useTheme();
  return (
    <View>
      <Controller
        control={control}
        name="username"
        render={({
          field: { onChange, ref, ...rest },
          formState: { errors },
        }) => (
          <>
            <AppTextInput
              onChangeText={onChange}
              {...rest}
              style={{
                backgroundColor: theme.colors.background,
              }}
              placeholder="Username"
            />
            <HelperText type="error" visible={!!errors.root}>
              {errors.username?.message}
            </HelperText>
          </>
        )}
      />
      <Controller
        control={control}
        name="position"
        render={({
          formState: { errors },
          field: { ref, onChange, ...rest },
        }) => (
          <BottomSheetSelect
            ref={ref}
            error={!!errors.root}
            label="Select Position"
            onSelect={onChange}
            options={position}
            {...rest}
          />
        )}
      />
    </View>
  );
}
