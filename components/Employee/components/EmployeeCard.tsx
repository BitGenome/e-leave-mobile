import { AntDesign } from "@expo/vector-icons";
import { Href } from "expo-router";
import { useExpoRouter } from "expo-router/build/global-state/router-store";
import { Pressable, StyleSheet, View } from "react-native";
import { Chip, IconButton, MD3Theme, useTheme } from "react-native-paper";
import { TextPoppinsBold } from "../../Text/TextPoppinsBold";
import Text from "@/ui/typography/regular";

interface IEmployeeCard {
  first_name: string;
  last_name: string;
  position: string;
  employee_id: number;
  path: Href<string>;
}

const positionIcons: Record<
  string,
  React.ComponentProps<typeof AntDesign>["name"]
> = {
  manager: "profile",
  mechanic: "tool",
  assistant: "profile",
  driver: "car",
};
export default function EmployeeCard(props: IEmployeeCard) {
  const { first_name, last_name, position, path, employee_id } = props;
  const name = `${first_name} ${last_name}`;
  const theme = useTheme();
  const styles = createStyles(theme);
  const router = useExpoRouter();

  return (
    <Pressable
      style={[styles.surface, { backgroundColor: theme.colors.surface }]}
      onPress={() => {
        router.navigate({
          pathname: path,
          params: {
            name,
            employee_id,
          },
        });
      }}
    >
      <View style={styles.container}>
        <View>
          <TextPoppinsBold variant="headlineSmall">{name}</TextPoppinsBold>
          <Chip
            style={{
              borderRadius: 30,
              borderColor: theme.colors.elevation.level3,
            }}
            mode="outlined"
            icon={({ color = theme.colors.secondary, size }) => {
              const defaultIcon = "question"; // Default icon if no specific match is found

              // Determine the icon based on the position
              const iconName = positionIcons[position] || defaultIcon;

              return <AntDesign name={iconName} color={color} size={size} />;
            }}
          >
            <Text
              style={{
                textTransform: "capitalize",
              }}
            >
              {position}
            </Text>
          </Chip>
        </View>
        <View>
          <IconButton
            icon={({ size, color }) => (
              <AntDesign name="arrowright" size={size} color={color} />
            )}
          />
        </View>
      </View>
    </Pressable>
  );
}
const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    surface: {
      flexDirection: "row",
      height: 130,
      marginVertical: 5,
      borderRadius: 15,
      padding: 15,
      marginHorizontal: 15,
      alignItems: "center",
    },
    container: {
      width: "100%",
      display: "flex",
      justifyContent: "space-between",
      flexDirection: "row",
      alignItems: "center",
    },
  });
};
