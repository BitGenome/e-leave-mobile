import CustomIcon from "@/ui/custom-icon";
import { StyleSheet, View, ViewProps } from "react-native";
import { Text, useTheme } from "react-native-paper";

interface SummaryCardProps extends ViewProps {
  label: string;
  total: number;
}

export default function SummaryCard({ style, ...props }: SummaryCardProps) {
  const { label, total } = props;
  const theme = useTheme();
  return (
    <View
      style={[
        styles.container,
        { backgroundColor: theme.colors.surface, width: "49%" },
        style,
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 5,
        }}
      >
        <Text style={[styles.label]}>{label}</Text>
      </View>
      <Text
        variant="headlineLarge"
        style={[styles.label, { color: theme.colors.primary, fontSize: 30 }]}
      >
        {total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    height: 130,

    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontFamily: "Poppins_600SemiBold",
  },
});
