import BottomSheetViewContainer from "@/components/BottomSheet/BottomSheetContainer/BottomSheetContainer";
import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { employedata } from "@/data/employee";
import useVisibility from "@/hooks/usePasswordVisibilityToggle";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import CustomIcon from "@/ui/custom-icon";
import { FlashList } from "@shopify/flash-list";
import { Href } from "expo-router";
import { Animated, StyleSheet, View } from "react-native";
import { IconButton, Searchbar, Text, useTheme } from "react-native-paper";

export default function LeavesScreen() {
  const scrollOffsetY = useTabBarVisibility();
  const { state: isOpenFilterBottomsheet, toggle: toogleFilterBottomSheet } =
    useVisibility({ defaultVisiblityState: false });
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { marginVertical: 10, backgroundColor: theme.colors.background },
      ]}
    >
      <View
        style={{
          marginHorizontal: 15,
          marginBottom: 10,
          flexDirection: "row",
          gap: 5,
        }}
      >
        <Searchbar
          style={{
            flex: 1,
          }}
          placeholder="Search leave"
          value=""
        />
        <IconButton
          onPress={toogleFilterBottomSheet}
          icon={() => <CustomIcon name="filter-sharp" library="ionic" />}
        />
      </View>
      <FlashList
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
      <BottomSheetViewContainer
        openBottomSheet={isOpenFilterBottomsheet}
        onDismiss={toogleFilterBottomSheet}
      >
        <Text>Hello</Text>
      </BottomSheetViewContainer>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
