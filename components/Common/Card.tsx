import React from "react";
import { StyleSheet, View, ViewProps, ViewStyle } from "react-native";
import { useTheme } from "react-native-paper";

interface CardProps extends ViewProps {
  children: React.ReactNode;
  style?: ViewStyle;
}
export default function Card({ children, style, ...rest }: CardProps) {
  const theme = useTheme();
  return (
    <View
      style={[
        styles.cardWrapper,
        { backgroundColor: theme.colors.background },
        style,
      ]}
      {...rest}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    padding: 5,
    borderRadius: 8,
  },
});
