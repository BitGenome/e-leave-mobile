import { StyleSheet } from "react-native";
import { Card, Text, useTheme } from "react-native-paper";

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
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Text variant="titleLarge">Hello</Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
    </Card>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 8,
  },
});
