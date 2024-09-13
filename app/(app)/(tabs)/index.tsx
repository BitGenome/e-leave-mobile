import AnnualLeaveCard from "@/components/HomeScreen/components/AnnualLeaveCard";
import { View } from "@/components/Themed";
import { useAppThemeStore } from "@/store/app";
import { StatusBar } from "expo-status-bar";
import { Dimensions, ScrollView, StyleSheet } from "react-native";
import { useTheme } from "react-native-paper";

export default function HomeScreen() {
  const theme = useTheme();
  const windowHeight = Dimensions.get("window").height;
  const { isDarkTheme } = useAppThemeStore();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={[
        styles.container,
        { backgroundColor: theme.colors.background, height: windowHeight },
      ]}
    >
      <StatusBar style={isDarkTheme ? "light" : "dark"} />
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
