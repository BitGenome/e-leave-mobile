import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { View as ScreenView } from "@/components/Themed";
import { employedata } from "@/data/employee";
import { useTabBarVisibility } from "@/hooks/useTabBarVisibility";
import { useAppStore } from "@/store/app";
import { AntDesign } from "@expo/vector-icons";
import { FlashList } from "@shopify/flash-list";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { MotiView } from "moti";
import { Animated, StyleSheet, View } from "react-native";
import { FAB, MD3Theme, Text, useTheme } from "react-native-paper";

export default function EmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const router = useExpoRouter();

  const isTabBarVisible = useAppStore((state) => state.isTabbarVisible);
  const scrollOffsetY = useTabBarVisibility();

  return (
    <ScreenView style={styles.container}>
      <View
        style={{
          flex: 1,
          paddingBottom: 15,
        }}
      >
        <FlashList
          contentInsetAdjustmentBehavior="automatic"
          renderItem={({ item, index }) => (
            <EmployeeCard key={index} path="/employee-detail" {...item} />
          )}
          data={employedata}
          ListEmptyComponent={<Text>No employee yet.</Text>}
          estimatedItemSize={20}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollOffsetY } } }],
            { useNativeDriver: false }
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
              onPress={() => router.navigate("register-employee")}
              mode="flat"
              icon={({ color, size }) => (
                <AntDesign color={color} size={size} name="pluscircle" />
              )}
              color={theme.colors.surface}
              style={styles.fab}
              animated
            />
          </MotiView>
        )}
      </View>
    </ScreenView>
  );
}

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
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
      borderRadius: 100,
      backgroundColor: theme.colors.primary,
      elevation: 8,
    },
    searchTextContainer: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: theme.colors.surface,
    },
    flashContainer: {
      paddingTop: 20,
    },
  });
};
