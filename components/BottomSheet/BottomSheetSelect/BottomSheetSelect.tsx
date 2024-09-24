import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetFlatList,
  BottomSheetModal,
} from "@gorhom/bottom-sheet";
import { forwardRef, useCallback, useRef, useState } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  IconButton,
  List,
  Text,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

export interface Option {
  label: string;
  value: string | number;
}

export type SelectValue = string | number;

export interface SelectProps {
  options: Option[];
  label: string;
  onSelect: (option: SelectValue) => void;
  value?: SelectValue;
  header?: string;
  snapPoint?: string[] | number[];
  error?: boolean;
}

export interface HeaderProps {
  label: string;
}

const BottomSheetSelect = forwardRef<View, SelectProps>(
  (
    {
      options,
      label,
      onSelect,
      value,
      header,
      snapPoint = ["30%", "50%"],
      error,
    },
    ref
  ) => {
    const theme = useTheme();
    const initialState = value
      ? ({ label: value, value: value } as Option)
      : undefined;

    const [selectedOption, setSelectedOption] = useState<Option | undefined>(
      initialState
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
                color: isActive ? theme.colors.primary : theme.colors.outline,
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
      <View ref={ref}>
        <TouchableRipple
          onPress={openBottomSheet}
          borderless
          style={{
            borderRadius: 8,
          }}
        >
          <View
            style={[
              styles.select,
              {
                borderColor: error ? theme.colors.error : theme.colors.outline,
                backgroundColor: theme.colors.surface,
              },
            ]}
          >
            <Text
              style={{
                fontFamily: "Poppins_400Regular",
                textTransform: "capitalize",
              }}
            >
              {selectedOption?.label || label}
            </Text>
            <IconButton icon="chevron-down" />
          </View>
        </TouchableRipple>

        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={0}
          snapPoints={snapPoint}
          backdropComponent={renderBackdrop}
          backgroundStyle={{
            backgroundColor: theme.colors.surface,
          }}
        >
          {header && renderHeader({ label: header })}
          <BottomSheetFlatList
            data={options}
            keyExtractor={(item) => item.value.toString()}
            renderItem={renderItem}
          />
        </BottomSheetModal>
      </View>
    );
  }
);
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
