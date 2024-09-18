import DashboardSummary from "@/components/HomeScreen/components/DashboardSummary";
import QuickActions from "@/components/HomeScreen/components/QuickActions";
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
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
      <View
        style={{
          height: windowHeight,
          gap: 10,
          paddingHorizontal: 15,
          paddingTop: 12,
        }}
      >
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
        <DashboardSummary />
        <View
          style={{
            paddingTop: 15,
          }}
        >
          <QuickActions />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 10,
  },
});
