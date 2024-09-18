import DashboardSummary from "@/components/HomeScreen/components/DashboardSummary";
import LeaveCalendar from "@/components/HomeScreen/components/LeaveCalendar";
import QuickActions from "@/components/HomeScreen/components/QuickActions";
import { View } from "@/components/Themed";
import { useAppThemeStore } from "@/store/app";
import { StatusBar } from "expo-status-bar";
import { ScrollView, StyleSheet } from "react-native";

export default function HomeScreen() {
  const { isDarkTheme } = useAppThemeStore();
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={[styles.container]}>
      <View style={[styles.containerWrapper]}>
        <StatusBar style={isDarkTheme ? "light" : "dark"} />
        <View
          style={{
            marginTop: 25,
            flex: 1,
            rowGap: 20,
            marginBottom: 80,
          }}
        >
          <DashboardSummary />
          <QuickActions />
          <LeaveCalendar />
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
  containerWrapper: {
    gap: 10,
    paddingHorizontal: 15,
    paddingTop: 12,
  },
});
