import React from "react";
import {
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from "react-native";
import { useTheme } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function AuthWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const { top } = useSafeAreaInsets();
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        flex: 1,
      }}
    >
      <View
        style={{
          flex: 1,
        }}
      >
        <ImageBackground
          style={[
            {
              backgroundColor: theme.colors.secondaryContainer,
              flex: 1,
            },
            StyleSheet.absoluteFill,
          ]}
          resizeMode="repeat"
          source={require("../../assets/illustrations/login.jpg")}
        />

        {/* Overlaying View */}
        <View style={styles.overlayContainer}>
          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : undefined}
            style={{ flex: 1 }}
            keyboardVerticalOffset={top}
          >
            <View
              style={[
                styles.overlayView,
                { backgroundColor: theme.colors.surface },
              ]}
            >
              {children}
            </View>
          </KeyboardAvoidingView>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlayContainer: {
    flex: 1,
    justifyContent: "flex-end", // Keeps the overlay at the bottom
  },
  overlayView: {
    flex: 1,
    padding: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 20,
    marginTop: "60%",
  },
});
