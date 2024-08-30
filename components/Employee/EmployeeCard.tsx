import { Link } from "expo-router";
import { Pressable, StyleSheet } from "react-native";
import { MD3Theme, Surface, useTheme } from "react-native-paper";
import { TextPoppinsBold } from "../Text/TextPoppinsBold";
import { TextPoppinsRegular } from "../Text/TextPoppinsRegular";

interface IEmployeeCard {
  name: string;
  position: string;
}

export default function EmployeeCard(props: IEmployeeCard) {
  const { name, position } = props;
  const theme = useTheme();
  const styles = createStyles(theme);

  return (
    <Link href={"/employee/employee-detail"} asChild>
      <Pressable>
        <Surface elevation={0} style={styles.surface}>
          <TextPoppinsBold variant="headlineSmall">{name}</TextPoppinsBold>
          <TextPoppinsRegular variant="bodyMedium">
            {position}
          </TextPoppinsRegular>
        </Surface>
      </Pressable>
    </Link>
  );
}
const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    surface: {
      height: 130,
      marginVertical: 10,
      borderRadius: 15,
      borderWidth: 1,
      borderColor: theme.colors.surfaceVariant,
      backgroundColor: theme.colors.onPrimary,
      padding: 15,
      marginHorizontal: 20,
    },
  });
};
