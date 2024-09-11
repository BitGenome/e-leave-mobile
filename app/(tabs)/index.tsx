import AnnualLeaveCard from "@/components/HomeScreen/components/AnnualLeaveCard";
import { View } from "@/components/Themed";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  const windowHeight = Dimensions.get("window").height;
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, height: windowHeight },
      ]}
    >
      <View
        style={{
          flex: 1,
          gap: 5,
          height: windowHeight,
          padding: 5,
          backgroundColor: theme.colors.background,
        }}
      >
        <AnnualLeaveCard />
        <AnnualLeaveCard />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
    marginHorizontal: 5,
  },
});
