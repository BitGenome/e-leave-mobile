import Card from "@/components/Common/Card";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface LeaveDetailsProps {}

export default function EmployeeDetails(props: LeaveDetailsProps) {
  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Employee Details</Text>
      <View style={styles.container}>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Name:</Text>
          <TextPoppinsRegular>Jane Doe</TextPoppinsRegular>
        </View>
        <View style={styles.detailsContainer}>
          <Text style={styles.label}>Position:</Text>
          <TextPoppinsRegular>Driver</TextPoppinsRegular>
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontFamily: "Poppins_700Bold",
    fontSize: 17,
  },
  detailsContainer: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  card: {
    padding: 15,
  },
  container: {
    paddingTop: 10,
    rowGap: 10,
  },
  label: {
    fontFamily: "Poppins_500Medium",
    fontWeight: "bold",
  },
});
