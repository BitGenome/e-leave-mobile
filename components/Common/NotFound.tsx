import { Image } from "expo-image";
import { Dimensions, StyleSheet, View, ViewProps } from "react-native";
import { TextPoppinsRegular } from "../Text/TextPoppinsRegular";

interface NotFoundProps extends ViewProps {
  title?: string;
}

export default function NotFound(props: NotFoundProps) {
  const { title = "Not found" } = props;
  return (
    <View style={styles.container} {...props}>
      <Image
        alt="Not found image"
        contentFit="cover"
        style={{
          width: 100,
          height: 100,
        }}
        source={require("../../assets/illustrations/not-found.png")}
      />
      <TextPoppinsRegular>{title}</TextPoppinsRegular>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 10,
    justifyContent: "center",
    alignItems: "center",
    height: Dimensions.get("window").height / 2,
  },
});
