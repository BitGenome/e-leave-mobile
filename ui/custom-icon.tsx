import { AntDesign, Ionicons } from "@expo/vector-icons";
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "react-native-paper";

export type AntDesignIconNames = React.ComponentProps<typeof AntDesign>["name"];
export type IoniconsIconNames = React.ComponentProps<typeof Ionicons>["name"];

// Union type of all possible icon names
export type IconName = AntDesignIconNames | IoniconsIconNames;

export type TIconLibrary = "antdesign" | "ionic";
// Define the props interface
interface CustomIconProps {
  name: IconName;
  size?: number;
  color?: string;
  library?: TIconLibrary;
  style?: StyleProp<TextStyle>;
}

const CustomIcon = (props: CustomIconProps) => {
  const theme = useTheme();
  const {
    style,
    library = "antdesign",
    name,
    size = 24,
    color = theme.colors.primary,
  } = props;
  if (library === "antdesign") {
    return (
      <AntDesign
        style={style}
        name={name as AntDesignIconNames}
        size={size}
        color={color}
      />
    );
  }

  return (
    <Ionicons
      style={style}
      name={name as IoniconsIconNames}
      size={size}
      color={color}
    />
  );
};
export default CustomIcon;
