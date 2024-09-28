import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { employedata } from "@/data/employee";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { FlashList } from "@shopify/flash-list";
import { Href } from "expo-router";
import { Animated, StyleSheet, View } from "react-native";
import { Searchbar, useTheme } from "react-native-paper";
import { View as ScreenView } from "@/components/Themed";
import NotFound from "@/components/Common/NotFound";

export default function LeavesScreen() {
  const scrollOffsetY = useTabBarVisibility();
  const theme = useTheme();

  return (
    <>
      <ScreenView style={[styles.container]}>
        <View
          style={{
            marginVertical: 15,
            marginHorizontal: 15,
            marginBottom: 10,
            flexDirection: "row",
            gap: 5,
          }}
        >
          <Searchbar
            style={{
              flex: 1,
              backgroundColor: theme.colors.surface,
            }}
            placeholder="Search leave"
            value=""
          />
        </View>
        <FlashList
          ListEmptyComponent={
            <NotFound title="There is no employee leaves found" />
          }
          showsVerticalScrollIndicator={false}
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item, index }) => (
            <EmployeeCard
              key={index}
              path={"/(employee-leaves)/leaves/[id]" as Href<string>}
              {...item}
            />
          )}
          data={employedata}
          estimatedItemSize={20}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
          )}
        />
      </ScreenView>
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
