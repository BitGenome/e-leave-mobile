import { StyleSheet } from "react-native";
import { Text, View } from "@/components/Themed";
import { Button } from "react-native-paper";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Button mode="contained">Hello</Button>
      <Button mode="contained-tonal">Hello</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "Poppins_400Regular",
  },
});
