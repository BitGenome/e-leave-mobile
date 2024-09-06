import PrimaryButton from "@/ui/primary-button";
import { AntDesign } from "@expo/vector-icons";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";

export default function LeaveCard() {
  const theme = useTheme();
  return (
    <Card
      mode="outlined"
      style={[
        styles.card,
        { backgroundColor: "white", borderColor: theme.colors.surfaceDisabled },
      ]}
    >
      <Card.Title
        style={{
          padding: 15,
          alignItems: "center",
        }}
        title="Sick Leave"
        right={() => (
          <Chip
            style={{
              backgroundColor: theme.colors.error,
            }}
            textStyle={{
              color: theme.colors.surface,
            }}
          >
            Rejected
          </Chip>
        )}
      />
      <Card.Content
        style={{
          rowGap: 10,
        }}
      >
        <View>
          <Text variant="labelMedium">Full Day Application</Text>
          <Text variant="headlineLarge">20 June 2025</Text>
        </View>
        <Divider
          style={{
            height: 2,
            backgroundColor: theme.colors.backdrop,
          }}
        />
        <View>
          <Button
            mode="contained"
            labelStyle={{
              fontSize: 17,
            }}
            style={{
              height: 55,
              backgroundColor: theme.colors.secondary,
            }}
            icon={({ color }) => (
              <AntDesign
                size={28}
                color={color}
                name="arrowright"
                style={{
                  marginTop: -3,
                }}
              />
            )}
            contentStyle={{ flexDirection: "row-reverse", height: 55 }}
          >
            View Details
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
});
