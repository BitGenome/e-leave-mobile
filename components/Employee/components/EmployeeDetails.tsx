import Card from "@/components/Common/Card";
import NotFound from "@/components/Common/NotFound";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

interface LeaveDetailsProps {
  first_name: string;
  last_name: string;
  position: string;
}

export default function EmployeeDetails(props: LeaveDetailsProps) {
  const { position, first_name, last_name } = props;

  return (
    <Card style={styles.card}>
      <Text style={styles.title}>Employee Details</Text>
      {!props ? (
        <NotFound />
      ) : (
        <View style={styles.container}>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextPoppinsRegular
              style={styles.employeePosition}
            >{`${first_name} ${last_name}`}</TextPoppinsRegular>
          </View>
          <View style={styles.detailsContainer}>
            <Text style={styles.label}>Position:</Text>
            <TextPoppinsRegular style={styles.employeePosition}>
              {position}
            </TextPoppinsRegular>
          </View>
        </View>
      )}
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
  employeePosition: {
    textTransform: "capitalize",
  },
});
