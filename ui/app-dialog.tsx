import * as React from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Dialog,
  DialogProps,
  Portal,
  useTheme,
} from "react-native-paper";
import PrimaryButton from "./primary-button";
import SecondaryButton from "./secondary-button";

interface AppDialogProps extends DialogProps {
  title?: string;
  content?: React.ReactNode;
  confirmText?: string;
  onConfirm?: () => void;
  cancelText?: string;
  onCancel?: () => void;
}

const AppDialog = ({
  title,
  content,
  confirmText = "Done",
  onConfirm,
  cancelText,
  onCancel,
  style,
  ...dialogProps
}: AppDialogProps) => {
  const theme = useTheme();
  return (
    <Portal>
      <Dialog
        style={[
          style,
          styles.dialogContainer,
          { backgroundColor: theme.colors.surface },
        ]}
        {...dialogProps}
      >
        <Dialog.Title>{title}</Dialog.Title>
        <Dialog.Content>{content}</Dialog.Content>
        <Dialog.Actions
          style={{
            flexDirection: "column-reverse",
            gap: 10,
          }}
        >
          {cancelText && (
            <SecondaryButton onPress={onCancel} style={styles.button}>
              {cancelText}
            </SecondaryButton>
          )}
          <PrimaryButton onPress={onConfirm} style={styles.button}>
            {confirmText}
          </PrimaryButton>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};

export default AppDialog;

const styles = StyleSheet.create({
  dialogContainer: {
    borderRadius: 30,
  },
  button: {
    width: "100%",
  },
});
