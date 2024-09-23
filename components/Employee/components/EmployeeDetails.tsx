import Card from "@/components/Common/Card";
import { TextPoppinsRegular } from "@/components/Text/TextPoppinsRegular";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-paper";

export default function EmployeeDetails() {
  return (
    <Card
      style={{
        padding: 15,
      }}
    >
      <Text style={styles.title}>Employee Details</Text>
      <View
        style={{
          paddingTop: 10,
        }}
      >
        <View
          style={{
            justifyContent: "space-between",
            flexDirection: "row",
          }}
        >
          <Text
            style={{
              fontFamily: "Poppins_500Medium",
              fontWeight: "bold",
            }}
          >
            Name:
          </Text>
          <TextPoppinsRegular>Jane Doe</TextPoppinsRegular>
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
});
