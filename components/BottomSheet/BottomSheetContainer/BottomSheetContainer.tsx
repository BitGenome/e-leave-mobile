import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useTheme } from "react-native-paper";

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
  const theme = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    if (openBottomSheet) {
      return sheetRef.current?.present();
    }

    return sheetRef.current?.dismiss();
  }, [openBottomSheet]);

  handlePresentModalPress();

  // useEffect(() => {
  //   handlePresentModalPress();
  // }, [openBottomSheet]);

  return (
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
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
    >
      <BottomSheetView>{children}</BottomSheetView>
    </BottomSheetModal>
  );
}
