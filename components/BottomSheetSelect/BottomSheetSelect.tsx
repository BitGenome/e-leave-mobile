import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { IconButton, List, useTheme } from "react-native-paper";

interface Option {
  label: string;
  value: string | number;
}

interface SelectProps {
  options: Option[];
  label: string;
  onSelect: (option: Option) => void;
  selectedValue?: Option;
}

const BottomSheetSelect = ({
  options,
  label,
  onSelect,
  selectedValue,
}: SelectProps) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    selectedValue
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option);
    bottomSheetModalRef.current?.dismiss();
  };

  const renderItem = ({ item }: { item: Option }) => (
    <List.Item
      title={item.label}
      onPress={() => handleSelect(item)}
      right={() =>
        selectedOption?.value === item.value && <IconButton icon="check" />
      }
    />
  );

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={2}
      />
    ),
    []
  );
  return (
    <>
      <TouchableOpacity onPress={openBottomSheet}>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 5,
            backgroundColor: "#fff",
            borderRadius: 8,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            borderWidth: 1,
            borderColor: theme.colors.outline,
          }}
        >
          <Text>{selectedOption?.label || label}</Text>
          <IconButton icon="chevron-down" />
        </View>
      </TouchableOpacity>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={["50%", "75%"]}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetFlatList
          data={options}
          keyExtractor={(item) => item.value.toString()}
          renderItem={renderItem}
        />
      </BottomSheetModal>
    </>
  );
};

export default BottomSheetSelect;
