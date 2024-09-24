import Card from "@/components/Common/Card";
import EditProfileForm from "@/components/Forms/Profile/Profile";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import { View as ScreenView } from "@/components/Themed";
import PrimaryButton from "@/ui/primary-button";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import { Avatar, useTheme } from "react-native-paper";
import * as zod from "zod";

export interface IProfile {
  username: string;
  position: string;
}

const profileSchema = zod
  .object({
    username: zod.string().min(1, { message: "Username is required." }),
    position: zod
      .string()
      .min(1, { message: "Employee position is required." }),
  })
  .required();

export default function ProfileScreen() {
  const theme = useTheme();

  const form = useForm<IProfile>({
    defaultValues: {
      username: "",
      position: "",
    },
    resolver: zodResolver(profileSchema),
  });

  const onSubmit: SubmitHandler<IProfile> = (data) => console.log(data);

  return (
    <ScreenView style={styles.screenContainer}>
      <Card style={styles.cardProfile}>
        <View>
          <TextPoppinsBold style={styles.labelTitle}>
            My Profile
          </TextPoppinsBold>
          <TextPoppinsRegular
            style={{
              color: theme.colors.outline,
            }}
          >
            Personal Account
          </TextPoppinsRegular>
        </View>
        <Avatar.Text label="J" />
      </Card>
      <Card style={styles.cardFormContainer}>
        <EditProfileForm control={form.control} />
      </Card>
      <View style={styles.submitButtonContainer}>
        <PrimaryButton onPress={form.handleSubmit(onSubmit)}>
          Save
        </PrimaryButton>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
    rowGap: 20,
  },
  cardProfile: {
    borderRadius: 15,
    padding: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  cardFormContainer: {
    padding: 15,
    borderRadius: 15,
  },
  submitButtonContainer: {
    padding: 10,
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  labelTitle: {
    fontSize: 20,
  },
});
