import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { Alert } from "react-native";

interface UnsavedChangesWarningProps {
  hasUnsavedChanges: boolean;
  title?: string;
  description?: string;
}

function useUnsavedChangesWarning({
  hasUnsavedChanges,
  title = "Discard changes?",
  description = "You have unsaved changes. Are you sure to discard them and leave the screen?",
}: UnsavedChangesWarningProps) {
  const navigation = useNavigation();

  useEffect(() => {
    const beforeRemoveListener = (e: any) => {
      if (!hasUnsavedChanges) {
        return;
      }

      e.preventDefault();

      Alert.alert(title, description, [
        { text: "Don't leave", style: "cancel", onPress: () => {} },
        {
          text: "Discard",
          style: "destructive",
          onPress: () => navigation.dispatch(e.data.action),
        },
      ]);
    };

    const unsubscribe = navigation.addListener(
      "beforeRemove",
      beforeRemoveListener
    );

    return () => unsubscribe();
  }, [navigation, hasUnsavedChanges]);
}

export default useUnsavedChangesWarning;
