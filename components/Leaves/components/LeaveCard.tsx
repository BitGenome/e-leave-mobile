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

interface LeaveCardProps {
  type: string;
  name: string;
  status: string;
  date: string;
  duration: string;
}

export default function LeaveCard(props: LeaveCardProps) {
  const { type, name, status, date, duration } = props;
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
        title={type}
        right={() => {
          if (status === "pending")
            return (
              <Chip
                theme={{ roundness: 8 }}
                style={{
                  backgroundColor: theme.colors.tertiary,
                }}
                textStyle={{
                  color: theme.colors.surface,
                  textTransform: "capitalize",
                }}
              >
                {status}
              </Chip>
            );

          if (status === "approved")
            return (
              <Chip
                theme={{ roundness: 8 }}
                style={{
                  backgroundColor: theme.colors.primary,
                }}
                textStyle={{
                  color: theme.colors.surface,
                  textTransform: "capitalize",
                }}
              >
                {status}
              </Chip>
            );

          return (
            <Chip
              theme={{ roundness: 8 }}
              style={{
                backgroundColor: theme.colors.error,
              }}
              textStyle={{
                color: theme.colors.surface,
                textTransform: "capitalize",
              }}
            >
              {status}
            </Chip>
          );
        }}
      />
      <Card.Content
        style={{
          rowGap: 10,
        }}
      >
        <View>
          <Text variant="labelMedium">{duration}</Text>
          <Text variant="headlineLarge">{date}</Text>
          <Text variant="titleMedium">{name}</Text>
        </View>
        <Divider
          style={{
            height: 2,
            backgroundColor: theme.colors.elevation.level5,
          }}
        />
        <View>
          <Button
            mode="contained"
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
            }}
            icon={({ color }) => (
              <AntDesign
                size={28}
                color={color}
                name="arrowright"
                style={{
                  marginTop: -5,
                  marginLeft: 80,
                }}
              />
            )}
            textColor={theme.colors.surface}
            contentStyle={{
              height: 60,
              flexDirection: "row-reverse",
            }}
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
    borderRadius: 20,
    marginVertical: 5,
  },
});
