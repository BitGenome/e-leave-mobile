import AuthWrapper from "@/components/Auth/AuthWrapper";
import RegisterForm, {
  RegisterInputProps,
} from "@/components/Forms/Auth/Register";
import { useAppThemeStore } from "@/store/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";

const registerUserSchema = zod
  .object({
    username: zod.string().min(1, { message: "username is required." }),
    password: zod.string().min(5, { message: "minimum of 5 characters." }),
    confirm_password: zod
      .string({ required_error: "Confirm password field is required." })
      .min(5, {
        message: "Confirm password field is minimum of 5 characters.",
      }),
  })
  .required()
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm password did not match",
        path: ["confirm_password"],
      });
    }
  });

const defaultValuesRegisterUser = {
  username: "",
  password: "",
  confirm_password: "",
};
export default function RegistrationScreen() {
  const { isDarkTheme } = useAppThemeStore();

  const form = useForm<RegisterInputProps>({
    defaultValues: defaultValuesRegisterUser,
    resolver: zodResolver(registerUserSchema),
  });

  const onSubmit: SubmitHandler<RegisterInputProps> = (data) => {
    console.log("data", data);
  };
  return (
    <>
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
      <AuthWrapper>
        <RegisterForm
          control={form.control}
          handleSubmit={form.handleSubmit(onSubmit)}
        />
      </AuthWrapper>
    </>
  );
}
