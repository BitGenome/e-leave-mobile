import CustomAnimatedTabBar from "@/components/TabBar/CustomTabBar";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof AntDesign>["name"];
  color: string;
}) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <>
      <Tabs
        tabBar={(props) => <CustomAnimatedTabBar {...props} />}
        screenOptions={{
          tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
          headerShown: false,
          headerShadowVisible: false,
          tabBarShowLabel: false,
          tabBarButton: (props) => (
            <TouchableRipple
              rippleColor={theme.colors.primaryContainer}
              borderless
              {...props}
            />
          ),
          tabBarStyle: [
            styles.tabBar,
            {
              backgroundColor: theme.colors.surface,
              borderColor: theme.colors.surfaceDisabled,
            },
          ],
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Home",
            tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          }}
        />
        <Tabs.Screen
          name="(leaves)/leaves"
          options={{
            title: "Leaves",
            headerShown: true,
            headerTitleAlign: "center",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="calendar" color={color} />
            ),
            headerTitle: () => (
              <TextPoppinsBold>Employee Leaves</TextPoppinsBold>
            ),
          }}
        />
        <Tabs.Screen
          name="apply-leave"
          options={{
            title: "Apply Leave",
            tabBarIcon: ({ color }) => <TabBarIcon name="plus" color={color} />,
          }}
        />
        <Tabs.Screen
          name="employee"
          options={{
            title: "Employees",
            tabBarIcon: ({ color }) => <TabBarIcon name="user" color={color} />,
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: "Settings",
            tabBarIcon: ({ color }) => (
              <TabBarIcon name="setting" color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    height: 90,
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    borderWidth: 0.5,
    elevation: 30,
  },
});
