import AuthWrapper from "@/components/Auth/AuthWrapper";
import LoginForm, { LoginInputProps } from "@/components/Forms/Auth/Login";
import { zodResolver } from "@hookform/resolvers/zod";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { SubmitHandler, useForm } from "react-hook-form";
import * as zod from "zod";

const loginSchema = zod
  .object({
    username: zod.string().min(1, { message: "username is required." }),
    password: zod.string().min(5, { message: "minimum of 5 characters." }),
  })
  .required();

export default function LoginScreen() {
  const router = useExpoRouter();

  const form = useForm<LoginInputProps>({
    defaultValues: {
      password: "",
      username: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const onSubmit: SubmitHandler<LoginInputProps> = (data) => {
    console.log("data", data);

    router.navigate("(tabs)");
    return;
  };
  return (
    <AuthWrapper>
      <LoginForm
        control={form.control}
        handleSubmit={form.handleSubmit(onSubmit)}
      />
    </AuthWrapper>
  );
}
