import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { View } from "@/components/Themed";
import { ROUTES } from "@/constants/Routes";
import { employedata } from "@/data/employee";
import { useAppStore } from "@/store/app";
import { FlashList } from "@shopify/flash-list";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { MotiView } from "moti";
import { useRef } from "react";
import { Animated, StyleSheet } from "react-native";
import { FAB, MD3Theme, useTheme } from "react-native-paper";

export default function EmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const router = useExpoRouter();

  const scrollOffsetY = useRef(new Animated.Value(0)).current;
  const [isTabBarVisible, hideTabBar, showTabBar] = useAppStore((state) => [
    state.isTabbarVisible,
    state.hideTabBar,
    state.showTabBar,
  ]);

  const handleScroll = (event: any) => {
    const currentOffset = event.nativeEvent.contentOffset.y;

    if (currentOffset > 50) {
      hideTabBar(); // Hide the tab bar when scrolling down
    } else {
      showTabBar(); // Show the tab bar when scrolling up
    }
  };

  return (
    <View style={[styles.container]}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => <EmployeeCard {...item} />}
        data={employedata}
        estimatedItemSize={20}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
          { useNativeDriver: false, listener: handleScroll }
        )}
      />
      {isTabBarVisible && (
        <MotiView
          from={{ opacity: 0, translateY: 20 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: "timing", duration: 300 }}
          style={styles.fab}
        >
          <FAB
            onPress={() => router.navigate("/register-employee")}
            mode="flat"
            icon="plus"
            style={styles.fab}
            animated
          />
        </MotiView>
      )}
    </View>
  );
}

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
      marginTop: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: "bold",
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: "80%",
    },
    fab: {
      position: "absolute",
      margin: 16,
      right: 0,
      bottom: 30,
      borderRadius: 20,
    },
    searchTextContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surface,
    },
    flashContainer: {
      marginTop: 20,
    },
  });
};
