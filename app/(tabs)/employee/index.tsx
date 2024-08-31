import EmployeeCard from "@/components/Employee/EmployeeCard";
import EmployeeSearchText from "@/components/Employee/EmployeeSearch";
import { View } from "@/components/Themed";
import { ROUTES } from "@/constants/Routes";
import { FlashList } from "@shopify/flash-list";
import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import { FAB, MD3Theme, useTheme } from "react-native-paper";
import { SafeAreaView } from "react-native-safe-area-context";
const employee = [
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
  {
    name: "Jhon Doe",
    position: "Driver",
  },
];

export default function EmployeeScreen() {
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.searchTextContainer}>
          <EmployeeSearchText />
        </View>
        <FlashList
          renderItem={({ item }) => <EmployeeCard {...item} />}
          data={employee}
          estimatedItemSize={20}
        />
        <Link href={"/register-employee"} asChild>
          <FAB icon="plus" style={styles.fab} animated />
        </Link>
      </View>
    </SafeAreaView>
  );
}

const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.surface,
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
      backgroundColor: theme.colors.background,
    },
  });
};
