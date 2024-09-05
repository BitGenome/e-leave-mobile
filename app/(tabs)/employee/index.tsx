import EmployeeCard from "@/components/Employee/components/EmployeeCard";
import { View } from "@/components/Themed";
import { employedata } from "@/data/employee";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { FAB, MD3Theme, Text, useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function EmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container]}>
      <FlashList
        contentInsetAdjustmentBehavior="automatic"
        renderItem={({ item }) => <EmployeeCard {...item} />}
        data={employedata}
        estimatedItemSize={20}
      />
      <Link href={{ pathname: "/register-employee" }} asChild>
        <FAB mode="flat" icon="plus" style={styles.fab} animated />
      </Link>
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
      bottom: 0,
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
