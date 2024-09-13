import LoginForm from "@/components/Forms/Auth/Login";
import { ImageBackground, StyleSheet, View } from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function LoginScreen() {
  const { top } = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      <ImageBackground
        style={[
          {
            marginTop: "-25%",
            backgroundColor: theme.colors.secondaryContainer,
          },
          StyleSheet.absoluteFill,
        ]}
        resizeMode="repeat"
        source={require("../../../assets/illustrations/login.jpg")}
      />

      {/* Overlaying View */}
      <View
        style={[styles.overlayView, { backgroundColor: theme.colors.surface }]}
      >
        <LoginForm />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayView: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    marginTop: "60%",
  },
});
