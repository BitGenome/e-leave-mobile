import { StyleSheet, View } from "react-native";
import { Avatar, Button, Divider, Text, useTheme } from "react-native-paper";
import Svg, { Path } from "react-native-svg";

export default function Profile() {
  const theme = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.surface }]}>
      <Avatar.Text label="JD" />
      <Text
        variant="headlineLarge"
        style={{
          fontFamily: "Poppins_600SemiBold",
          marginTop: 10,
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
      <Button
        mode="contained"
        style={{
          marginTop: 10,
          borderRadius: 20,
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
    height: 250,
    width: "100%",
  },
});
