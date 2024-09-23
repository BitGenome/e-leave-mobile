import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import CustomIcon from "@/ui/custom-icon";
import { useRouter } from "expo-router";
import { memo, useCallback } from "react";
import { StyleSheet, View } from "react-native";
import {
  Button,
  Card,
  Chip,
  Divider,
  Text,
  useTheme,
} from "react-native-paper";

export interface LeaveCardProps {
  type: string;
  status: string;
  date: string;
  duration: string;
  id: string;
}

const LEAVE_STATUS = {
  approved: "approved",
  denied: "denied",
  pending: "pending",
};

const LeaveCard = (props: LeaveCardProps) => {
  const { type, status, date, duration, id } = props;
  const router = useRouter();
  const theme = useTheme();

  const handleViewDetailsPress = useCallback(() => {
    return router.navigate({
      pathname: "/(app)/(employee-leaves)/leaves/leave-details/[id]",
      params: {
        id,
      },
    });
  }, [router, id]);

  return (
    <Card
      mode="contained"
      style={[
        styles.card,
        {
          backgroundColor: theme.colors.surface,
          borderColor: theme.colors.surfaceDisabled,
        },
      ]}
    >
      <Card.Title
        style={{
          padding: 15,
          alignItems: "center",
        }}
        title={type}
        right={() => {
          if (status === LEAVE_STATUS.pending)
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

          if (status === LEAVE_STATUS.approved)
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
          <Text
            variant="headlineLarge"
            style={{
              fontFamily: "Poppins_700Bold",
            }}
          >
            {date}
          </Text>
        </View>
        <Divider
          style={{
            height: 1,
            backgroundColor: theme.colors.elevation.level5,
          }}
        />
        <View
          style={{
            marginTop: 10,
          }}
        >
          <Button
            onPress={handleViewDetailsPress}
            mode="contained"
            style={{
              flex: 1,
              backgroundColor: theme.colors.primary,
            }}
            textColor={theme.colors.surface}
            contentStyle={{
              height: 55,
            }}
          >
            <View
              style={{
                width: "100%",
                flexDirection: "row",
                justifyContent: "space-between",
                flex: 1,
              }}
            >
              <TextPoppinsRegular
                style={{
                  color: theme.colors.surface,
                }}
              >
                View Details
              </TextPoppinsRegular>
              <CustomIcon
                style={{
                  marginLeft: 10,
                }}
                size={20}
                color={theme.colors.surface}
                name="arrowright"
              />
            </View>
          </Button>
        </View>
      </Card.Content>
    </Card>
  );
};

export default memo(LeaveCard);
const styles = StyleSheet.create({
  card: {
    borderRadius: 20,
    marginVertical: 5,
  },
});
