import PrimaryButton from "@/ui/primary-button";
import {
  BottomSheetBackdrop,
  BottomSheetBackdropProps,
  BottomSheetModal,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useCallback, useMemo, useRef } from "react";
import { Keyboard, StyleSheet, View } from "react-native";
import {
  MD3Theme,
  Text,
  TextInput,
  TouchableRipple,
  useTheme,
} from "react-native-paper";

const positions = [
  {
    name: "Driver",
  },
  {
    name: "Admin assistant",
  },
  {
    name: "Manager",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
  {
    name: "Mechanic",
  },
];

export default function RegisterEmployeeForm() {
  const theme = useTheme();
  const styles = createStyles(theme);

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);
  // variables
  const snapPoints = useMemo(() => ["50%", "95%"], []);
  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    console.log("handleSheetChanges", index);
  }, []);

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
    <View style={styles.formContainer}>
      <TextInput
        mode="outlined"
        placeholder="Employee no."
        theme={{ roundness: 8 }}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        placeholder="First name"
        theme={{ roundness: 8 }}
        style={styles.input}
      />
      <TextInput
        mode="outlined"
        placeholder="Last name"
        style={styles.input}
        theme={{ roundness: 8 }}
      />
      <TouchableRipple
        onPress={() => {
          Keyboard.dismiss();
          handlePresentModalPress();
        }}
        borderless
        centered
      >
        <TextInput
          editable={false}
          label={"Select employee position"}
          mode="outlined"
          theme={{ roundness: 8 }}
          right={<TextInput.Icon icon={"chevron-down"} />}
          pointerEvents="none"
        />
      </TouchableRipple>

      <PrimaryButton theme={{ roundness: 3 }}>Save</PrimaryButton>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
        backdropComponent={renderBackdrop}
      >
        <BottomSheetScrollView style={styles.contentContainer}>
          {positions.map((pos, _index) => (
            <TouchableRipple
              style={styles.itemContent}
              onPress={() => console.log("hello")}
              key={_index}
            >
              <Text variant="labelMedium">{pos.name}</Text>
            </TouchableRipple>
          ))}
        </BottomSheetScrollView>
      </BottomSheetModal>
    </View>
  );
}
const createStyles = (theme: MD3Theme) => {
  return StyleSheet.create({
    formContainer: {
      flex: 1,
      gap: 15,
    },
    submit: {
      marginTop: 20,
      textAlignVertical: "center",
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
    },
    contentContainer: {
      flex: 1,
      padding: 5,
    },
    itemContent: {
      padding: 10,
      borderBottomWidth: 1,
      borderBottomColor: theme.colors.surfaceDisabled,
      margin: 6,
    },
  });
};
