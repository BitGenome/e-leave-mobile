import { useSearchEmployee } from "@/api/employees/use-employee-data";
import { HighlightedText } from "@/components/Common/HighlightedSearchTerm";
import NotFound from "@/components/Common/NotFound";
import { View as ScreenView } from "@/components/Themed";
import CustomIcon from "@/ui/custom-icon";
import { nameFormatter } from "@/utils/nameFormatter";
import { FlashList } from "@shopify/flash-list";
import { Stack, useFocusEffect, useRouter } from "expo-router";
import { useCallback, useRef, useState } from "react";
import { TextInput as RNTextInput, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  Text,
  TextInput,
  useTheme,
} from "react-native-paper";
import { type Employee } from "../../../components/Leaves/components/LeaveCard";

interface TEmployee extends Employee {
  employee_id: number;
}

export default function SearchEmployeeScreen() {
  const theme = useTheme();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const { data: searchEmployeeData } = useSearchEmployee(searchQuery);
  const textInputRef = useRef<RNTextInput>(null);

  const renderItem = ({ item }: { item: TEmployee }) => {
    const name = nameFormatter({
      first_name: item.first_name,
      last_name: item.last_name,
    });
    return (
      <List.Item
        style={{
          backgroundColor: theme.colors.background,
          padding: 15,
        }}
        onPress={() => {
          return router.navigate({
            pathname: "/(app)/(employee)/employee-detail",
            params: {
              id: item.employee_id,
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

  const handleClearSearchText = useCallback(() => {
    setSearchQuery("");
  }, [setSearchQuery]);

  useFocusEffect(
    useCallback(() => {
      const focus = () => {
        setTimeout(() => {
          textInputRef?.current?.focus();
        }, 1);
      };
      focus();
      return focus();
    }, [textInputRef])
  );

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
                placeholder="Search your employee"
                style={[styles.searchBar, { fontSize: 14 }]}
              />
            </View>
          ),
          headerRight: () =>
            searchQuery && (
              <IconButton
                onPress={handleClearSearchText}
                icon={() => <CustomIcon name="close" />}
              />
            ),
        }}
      />
      <ScreenView style={styles.screenView}>
        {searchQuery === "" ? (
          <Text
            style={{
              textAlign: "center",
              marginTop: 15,
              fontWeight: "700",
            }}
            variant="bodyMedium"
          >
            Try searching your employee here
          </Text>
        ) : (
          <FlashList
            estimatedItemSize={10}
            data={searchEmployeeData}
            renderItem={renderItem}
            keyExtractor={(item) => item.employee_id.toString()}
            keyboardShouldPersistTaps="handled"
            ListEmptyComponent={<NotFound title="Oops no employee found." />}
          />
        )}
      </ScreenView>
    </>
  );
}

const SEARCH_BUTTON_WIDTH = 80; // Approximate width of the search button
const styles = StyleSheet.create({
  headerContainer: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: SEARCH_BUTTON_WIDTH + 100,
    justifyContent: "center",
  },
  searchBar: {},
  searchBarInput: {
    fontSize: 13,
  },
  searchButton: {
    marginRight: 10,
    width: SEARCH_BUTTON_WIDTH,
  },
  screenView: {
    flex: 1,
  },
});
