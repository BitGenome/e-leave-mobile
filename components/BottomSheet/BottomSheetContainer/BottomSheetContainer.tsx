import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { useCallback, useRef, ReactNode, useEffect } from "react";
import { StyleSheet, View } from "react-native";

interface BottomSheetViewContainerProps {
  children: ReactNode;
  snapPoints?: (string | number)[];
  openBottomSheet?: boolean;
  /** trigger for ondismiss of bottom sheet */
  onDismiss?: () => void;
}

export default function BottomSheetViewContainer({
  children,
  snapPoints,
  openBottomSheet = false,
  onDismiss,
}: BottomSheetViewContainerProps) {
  const sheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    if (openBottomSheet) {
      sheetRef.current?.present();
    }
  }, [openBottomSheet]);

  useEffect(() => {
    handlePresentModalPress();
  }, [openBottomSheet]);

  return (
    <View style={styles.container}>
      <BottomSheetModal
        onDismiss={onDismiss}
        ref={sheetRef}
        enableDynamicSizing
        index={0}
        snapPoints={snapPoints}
        backdropComponent={(props) => (
          <BottomSheetBackdrop
            disappearsOnIndex={-1}
            appearsOnIndex={2}
            {...props}
          />
        )}
      >
        <BottomSheetView>{children}</BottomSheetView>
      </BottomSheetModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
