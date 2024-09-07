import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import React, { useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

interface Option {
  label: string;
  value: string | number;
}

export type SelectValue = string | number;

interface SelectProps {
  options: Option[];
  label: string;
  onSelect: (option: SelectValue) => void;
  value?: SelectValue;
  header?: string;
  snapPoint?: string[] | number[];
  error?: boolean;
}

interface HeaderProps {
  label: string;
}

const BottomSheetSelect = ({
  options,
  label,
  onSelect,
  value,
  header,
  snapPoint = ["30%", "50%"],
  error,
}: SelectProps) => {
  const theme = useTheme();
  const [selectedOption, setSelectedOption] = useState<Option | undefined>(
    undefined
  );
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const openBottomSheet = useCallback(() => {
    Keyboard.dismiss();
    bottomSheetModalRef.current?.present();
  }, []);

  const handleSelect = (option: Option) => {
    setSelectedOption(option);
    onSelect(option.value);
    bottomSheetModalRef.current?.dismiss();
  };

  const renderItem = ({ item }: { item: Option }) => (
    <List.Item
      style={{
        borderBottomWidth: 1,
        borderBottomColor: theme.colors.surfaceDisabled,
      }}
      contentStyle={{
        height: 40,
      }}
      title={() => {
        const isActive = item.value === selectedOption?.value;
        return (
          <Text
            style={{
              fontFamily: "Poppins_400Regular",
              color: isActive ? theme.colors.primary : undefined,
            }}
          >
            {item.label}
          </Text>
        );
      }}
      onPress={() => handleSelect(item)}
      right={() =>
        selectedOption?.value === item.value && (
          <List.Icon color={theme.colors.primary} icon="check" />
        )
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

  const renderHeader = useCallback(
    (props: HeaderProps) => (
      <View
        style={{
          padding: 10,
          borderBottomWidth: 1,
          borderBottomColor: theme.colors.surfaceDisabled,
        }}
      >
        <Text
          variant="labelLarge"
          style={{ textAlign: "center", fontFamily: "Poppins_700Bold" }}
        >
          {props.label}
        </Text>
      </View>
    ),
    []
  );
  return (
    <>
      <TouchableRipple onPress={openBottomSheet} borderless>
        <View
          style={[
            styles.select,
            {
              borderColor: error ? theme.colors.error : theme.colors.outline,
              backgroundColor: theme.colors.surface,
            },
          ]}
        >
          <Text>{selectedOption?.label || label}</Text>
          <IconButton icon="chevron-down" />
        </View>
      </TouchableRipple>

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoint}
        backdropComponent={renderBackdrop}
      >
        {header && renderHeader({ label: header })}
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

const styles = StyleSheet.create({
  select: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
  },
});
