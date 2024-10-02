import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useEffect, useRef } from "react";
import { useTheme } from "react-native-paper";

interface BottomSheetViewContainerProps
  extends Omit<BottomSheetModalProps, "onDismiss" | "openBottomSheet"> {
  children: ReactNode;
  closeOnPressBackDrop?: boolean;
  snapPoints?: (string | number)[];
  openBottomSheet?: boolean;
  /** trigger for ondismiss of bottom sheet */
  onDismiss?: () => void;
  /** use this for bottom sheet that has list
   * then in your component use the BottomSheetFlatlist as children
   */
  isList?: boolean;
}

export default function BottomSheetViewContainer({
  children,
  openBottomSheet = false,
  onDismiss,
  closeOnPressBackDrop = true,
  isList = false,
  ...rest
}: BottomSheetViewContainerProps) {
  const theme = useTheme();
  const sheetRef = useRef<BottomSheetModal>(null);

  const handlePresentModalPress = useCallback(() => {
    if (openBottomSheet) {
      return sheetRef.current?.present();
    }
    return sheetRef.current?.dismiss();
  }, [openBottomSheet]);

  useEffect(() => {
    handlePresentModalPress();
  }, [handlePresentModalPress]);

  return (
    <BottomSheetModal
      handleIndicatorStyle={{
        backgroundColor: theme.colors.primaryContainer,
      }}
      onDismiss={onDismiss}
      ref={sheetRef}
      enableDynamicSizing
      index={0}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          pressBehavior={closeOnPressBackDrop ? "close" : "none"}
          disappearsOnIndex={-1}
          appearsOnIndex={1}
          {...props}
        />
      )}
      backgroundStyle={{
        backgroundColor: theme.colors.surface,
      }}
      {...rest}
    >
      {isList ? children : <BottomSheetView>{children}</BottomSheetView>}
    </BottomSheetModal>
  );
}
