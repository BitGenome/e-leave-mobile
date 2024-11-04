import { useContext, createContext, type PropsWithChildren } from "react";
import { useStorageState } from "./hooks/useStorageState";
import { loginUser } from "./api/user/user.service";
import { RegisterInputProps } from "./components/Forms/Auth/Register";
import { toast } from "sonner-native";

const AuthContext = createContext<{
  signIn: (signinData: Omit<RegisterInputProps, "confirm_password">) => void;
  signOut: () => void;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== "production") {
    if (!value) {
      throw new Error("useSession must be wrapped in a <SessionProvider />");
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: async ({
          username,
          password,
        }: Omit<RegisterInputProps, "confirm_password">) => {
          try {
            const user = await loginUser({ username, password });
            setSession(user.user.id.toString());
          } catch (error) {
            if (error instanceof Error) {
              toast.error("Error", { description: error.message });
            }
          }
        },
        signOut: () => {
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
