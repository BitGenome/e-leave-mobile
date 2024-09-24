import { useRouter } from "expo-router";
import { useCallback } from "react";
import { StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Text, useTheme } from "react-native-paper";

export default function Profile() {
  const theme = useTheme();
  const router = useRouter();
  const handleProfile = useCallback(() => {
    router.navigate("/(app)/settings/profile");
  }, [router]);

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Avatar.Text label="JD" />
      <Text
        variant="headlineLarge"
        style={{
          fontFamily: "Poppins_600SemiBold",
          marginTop: 5,
        }}
      >
        Jane Doe
      </Text>
      <Text
        variant="titleMedium"
        style={{ color: theme.colors.outline, fontSize: 14 }}
      >
        Owner of PenBrook
      </Text>
      <Divider
        style={{
          width: "100%",
          marginVertical: 5,
          borderWidth: 1,
          borderColor: theme.colors.elevation.level1,
        }}
      />

      <View
        style={{
          backgroundColor: theme.colors.primaryContainer,
          height: 80,
          width: "80%",
          borderRadius: 20,
          alignItems: "center",
          marginBottom: 20,
        }}
      ></View>
      <Button
        onPress={handleProfile}
        mode="contained"
        contentStyle={{
          height: 50,
        }}
        style={{
          width: "50%",
          borderRadius: 35,
          position: "absolute",
          bottom: 0,
          borderWidth: 7,
          borderColor: theme.colors.surface,
        }}
      >
        Edit profile
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    height: 270,
    width: "100%",
    position: "relative",
  },
});
