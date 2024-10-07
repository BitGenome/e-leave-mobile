import { View, ViewProps } from "react-native";

export const CenteredView = (props: ViewProps) => {
  const { style, ...otherProps } = props;

  return (
    <View
      style={[{ flex: 1, justifyContent: "center" }, style]}
      {...otherProps}
    />
  );
};
