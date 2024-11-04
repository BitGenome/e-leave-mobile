import { loginUser, registerUser } from "@/api/user/user.service";
import AuthWrapper from "@/components/Auth/AuthWrapper";
import RegisterForm, {
  RegisterInputProps,
} from "@/components/Forms/Auth/Register";
import { useAppThemeStore } from "@/store/app";
import { zodResolver } from "@hookform/resolvers/zod";
import { StatusBar } from "expo-status-bar";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner-native";
import * as zod from "zod";

const registerUserSchema = zod
  .object({
    username: zod.string().min(1, { message: "username is required." }),
    password: zod.string().min(5, { message: "minimum of 5 characters." }),
    confirm_password: zod.string().min(5, {
      message: "Confirm password field is minimum of 5 characters.",
    }),
  })
  .required()
  .superRefine(({ confirm_password, password }, ctx) => {
    if (confirm_password !== password) {
      ctx.addIssue({
        code: "custom",
        message: "The confirm password did not match.",
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

  const onSubmit: SubmitHandler<RegisterInputProps> = async (data) => {
    try {
      await registerUser(data);
      toast.success("Success", {
        duration: 6000,
        description: "You succesfully register.",
      });
      form.reset();
    } catch (error) {
      if (error instanceof Error) {
        toast.error("Error", {
          description: error.message,
        });
        throw new Error(`${error.message}`);
      }
      throw Error("Unexpected error");
    }
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
