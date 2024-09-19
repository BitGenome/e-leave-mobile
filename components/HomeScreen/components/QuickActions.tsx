import CustomIcon from "@/ui/custom-icon";
import { Href } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { ReactElement, useCallback } from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface QuickActionsDataProps {
  title: string;
  path: Href<string>;
  icon: ReactElement;
}

const quickActions: QuickActionsDataProps[] = [
  {
    title: "Request Leave",
    path: "/(app)/apply-leave/",
    icon: <CustomIcon name="calendar" />,
  },
  {
    title: "Employees",
    path: "/(app)/(tabs)/employee",
    icon: <CustomIcon name="user" />,
  },
  {
    title: "Leaves",
    path: "/(app)/(tabs)/leaves",
    icon: <CustomIcon name="people" library="ionic" />,
  },
];

export default function QuickActions() {
  const theme = useTheme();
  const router = useExpoRouter();
  const renderItems = useCallback((props: QuickActionsDataProps) => {
    return (
      <TouchableOpacity
        key={props.title}
        onPress={() => router.navigate(props.path)}
      >
        <View
          style={[
            styles.itemContainer,
            {
              backgroundColor: theme.colors.background,
            },
          ]}
        >
          <View
            style={{
              alignItems: "center",
              flex: 1,
            }}
          >
            <View style={{ height: 40, justifyContent: "center" }}>
              {props.icon}
            </View>
            <Text variant="bodySmall" style={styles.quickActionsText}>
              {props.title}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
    );
  }, []);

  return (
    <View>
      <Text style={styles.sectionTitle}>Quick actions</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 10,
        }}
      >
        {quickActions.map((data, _index) => renderItems(data))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: 85,
    height: 85,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
  },
  sectionTitle: {
    fontFamily: "Poppins_600SemiBold",
    fontSize: 20,
  },
  quickActionsText: {
    fontFamily: "Poppins_400Regular",
    textAlign: "center",
  },
});
