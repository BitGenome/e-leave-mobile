import { View as ScreenView } from "@/components/Themed";
import CustomIcon from "@/ui/custom-icon";
import Text from "@/ui/typography/regular";
import { Stack, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { StyleSheet, View } from "react-native";
import { IconButton, List, TextInput, useTheme } from "react-native-paper";
import { TextInput as RNTextInput } from "react-native";
import { useSearchEmployeeLeaves } from "@/api/leaves-request/use-leave-request";
import { FlashList } from "@shopify/flash-list";
import { HighlightedText } from "@/components/Common/HighlightedSearchTerm";

import { nameFormatter } from "@/utils/nameFormatter";
import NotFound from "@/components/Common/NotFound";
import { Employee } from "@/components/Leaves/components/LeaveCard";

interface TEmployeeData extends Employee {
  employee_id: number;
}

export default function SearchLeavesScreen() {
  const theme = useTheme();
  const textInputRef = useRef<RNTextInput>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const router = useRouter();
  const { data: employeeLeavesQueryData } =
    useSearchEmployeeLeaves(searchQuery);

  const handleClearSearchText = useCallback(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  const renderItem = ({
    item,
  }: {
    item: { employees: TEmployeeData; leave_request: any };
  }) => {
    const name = nameFormatter({
      first_name: item.employees.first_name,
      last_name: item.employees.last_name,
    });
    return (
      <List.Item
        style={{
          backgroundColor: theme.colors.background,
          padding: 15,
        }}
        onPress={() => {
          return router.navigate({
            pathname: "/(app)/(employee-leaves)/leaves/[id]",
            params: {
              id: item.employees.employee_id,
              name,
            },
          });
        }}
        title={() => <HighlightedText name={name} searchTerm={searchQuery} />}
        titleNumberOfLines={1}
        right={(props) => (
          <List.Icon
            {...props}
            icon={() => (
              <CustomIcon
                style={{
                  transform: [{ translateX: 10 }, { rotate: "-120deg" }],
                }}
                name="arrow-forward"
                color={theme.colors.outlineVariant}
                library="ionic"
              />
            )}
          />
        )}
      />
    );
  };

  return (
    <>
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitleAlign: "left",
          title: "Search employee",
          headerTitle: () => (
            <View style={styles.headerContainer}>
              <TextInput
                ref={textInputRef}
                outlineStyle={{
                  borderColor: theme.colors.elevation.level0,
                }}
                keyboardType="default"
                returnKeyLabel="Search"
                returnKeyType="search"
                textColor={theme.colors.primary}
                mode="outlined"
                autoFocus={true}
                onChangeText={setSearchQuery}
                value={searchQuery}
                placeholder="Search your employee leaves"
                style={[{ fontSize: 14 }]}
              />
            </View>
          ),
          headerRight: () => (
            <View>
              {searchQuery && (
                <IconButton
                  onPress={handleClearSearchText}
                  icon={() => <CustomIcon name="close" />}
                />
              )}
            </View>
          ),
        }}
      />
      <ScreenView style={styles.screenWrapper}>
        {searchQuery === "" ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              fontWeight: "700",
            }}
            variant="bodyMedium"
          >
            Try searching your employee name here
          </Text>
        ) : (
          <FlashList
            estimatedItemSize={10}
            //@ts-ignore
            data={employeeLeavesQueryData}
            renderItem={renderItem}
            keyExtractor={(item) => item.employees.employee_id.toString()}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={
              <NotFound title="Oops employee have not a leave request." />
            }
          />
        )}
      </ScreenView>
    </>
  );
}
const styles = StyleSheet.create({
  screenWrapper: {
    flex: 1,
  },
  headerContainer: {
    flex: 1,
    paddingLeft: 10,
    justifyContent: "center",
  },
});
