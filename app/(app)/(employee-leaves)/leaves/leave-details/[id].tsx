import { View as ScreenView } from "@/components/Themed";
import { useLocalSearchParams } from "expo-router";
import { StyleSheet, View } from "react-native";
import { Chip, Divider, Text, TextInput, useTheme } from "react-native-paper";

export default function LeaveDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const theme = useTheme();

  return (
    <ScreenView style={styles.screenContainer}>
      <View
        style={{
          gap: 30,
          backgroundColor: theme.colors.background,
          padding: 10,
          marginTop: 10,
          borderRadius: 15,
        }}
      >
        <View
          style={{
            alignItems: "flex-start",
          }}
        >
          <Text style={styles.label}>Application Status</Text>
          <Chip
            textStyle={{
              color: theme.colors.surface,
            }}
            style={{
              backgroundColor: theme.colors.tertiary,
              borderRadius: 30,
            }}
          >
            Pending
          </Chip>
        </View>
        <Divider />
        <View>
          <Text style={styles.label}>Date of Application</Text>
          <Text style={styles.contentText}>03 September 2024</Text>
        </View>
        <Divider />
        <View>
          <Text style={styles.label}>Type of Leave</Text>
          <Text style={styles.contentText}>Sick leave</Text>
        </View>
        <Divider />
        <View>
          <Text style={styles.label}>Remarks</Text>
          <TextInput
            readOnly
            mode="outlined"
            style={{
              minHeight: 100,
            }}
            theme={{ roundness: 10 }}
            multiline
            value="Hello"
            outlineStyle={{
              borderColor: theme.colors.elevation.level3,
            }}
          />
        </View>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    padding: 10,
  },
  label: { fontFamily: "Poppins_600SemiBold" },
  contentText: {
    fontFamily: "Poppins_400Regular",
  },
});
