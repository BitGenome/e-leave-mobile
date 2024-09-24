import { View as ScreenView } from "@/components/Themed";
import CustomIcon from "@/ui/custom-icon";
import { Stack } from "expo-router";
import { View } from "react-native";
import { Button, IconButton, List, Searchbar } from "react-native-paper";

export default function SearchEmployeeScreen() {
  return (
    <ScreenView
      style={{
        flex: 1,
      }}
    >
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          headerRight: () => <Button>Search</Button>,
          title: "Search employee",
          headerTitle: () => (
            <Searchbar
              value=""
              inputStyle={{
                fontSize: 14,
                flex: 1,
                height: 30,
              }}
              style={{
                width: "60%",
                height: 30,
                marginLeft: 10, // Adds margin to the left of the search bar
                marginRight: 10, // Adds margin to the right so it doesn't overlap with the button
              }}
              placeholder="Search employee here"
            />
          ),
        }}
      />
      <List.Item title="Jane Doe" />
    </ScreenView>
  );
}
