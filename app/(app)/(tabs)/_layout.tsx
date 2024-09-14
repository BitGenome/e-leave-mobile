import NavigationHeaderTitle from "@/components/Navigation/HeaderTitle/CustomHeaderTitle";
import CustomAnimatedTabBar from "@/components/Navigation/TabBar/CustomTabBar";
import { TextPoppinsBold } from "@/components/Text/TextPoppinsBold";
import { useColorScheme } from "@/components/useColorScheme";
import Colors from "@/constants/Colors";
import Ionicons from "@expo/vector-icons/Ionicons";
import AntDesign from "@expo/vector-icons/AntDesign";
import { Tabs } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";
import { TouchableRipple, useTheme } from "react-native-paper";

type IconName = React.ComponentProps<typeof AntDesign>["name"];

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
export function TabBarIcon(props: { name: IconName; color: string }) {
  return <AntDesign size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const theme = useTheme();

  return (
    <Tabs
      tabBar={(props) => <CustomAnimatedTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].primary,
        headerShown: false,
        headerShadowVisible: false,
        tabBarShowLabel: false,
        tabBarHideOnKeyboard: true,
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
          headerTitle: () => (
            <TextPoppinsBold style={{ fontSize: 20 }}>
              Welcome back
            </TextPoppinsBold>
          ),
          headerShown: true,
          headerTitleAlign: "center",
          title: "Home",
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
        }}
      />
      <Tabs.Screen
        name="leaves"
        options={{
          title: "Leaves",
          headerShown: true,
          headerTitleAlign: "center",
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="calendar" color={color} />
          ),
          headerTitle: () => (
            <NavigationHeaderTitle title="Employee with Leaves" />
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
          headerShown: true,
          headerTransparent: true,
          headerTitleAlign: "center",
          headerTitle: () => <NavigationHeaderTitle title="Settings" />,
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="setting" color={color} />
          ),
        }}
      />
    </Tabs>
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
