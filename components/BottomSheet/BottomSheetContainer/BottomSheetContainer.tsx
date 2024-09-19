import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { ReactNode, useCallback, useRef } from "react";
import { useTheme } from "react-native-paper";

interface BottomSheetViewContainerProps
  extends Omit<BottomSheetModalProps, "onDismiss" | "openBottomSheet"> {
  children: ReactNode;
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
  snapPoints,
  openBottomSheet = false,
  onDismiss,
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

  handlePresentModalPress();

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
      {...rest}
    >
      {isList ? children : <BottomSheetView>{children}</BottomSheetView>}
    </BottomSheetModal>
  );
}
