import CustomIcon from "@/ui/custom-icon";
import AppTextInput from "@/ui/text-input";
import { StyleSheet, View } from "react-native";
import {
  Divider,
  HelperText,
  IconButton,
  TextInput,
  useTheme,
} from "react-native-paper";
import { useLeaveBalance } from "../../../hooks/useLeaveBalance";
import Card from "@/components/Common/Card";

export default function LeaveBalanceForm() {
  const theme = useTheme();
  const { balance, increment, decrement } = useLeaveBalance();
  const {
    balance: vacationLeaveBalance,
    increment: vacationLeaveInc,
    decrement: vacationLeaveDec,
  } = useLeaveBalance();
  const {
    increment: emergencyLeaveInc,
    balance: emergencyLeaveBalance,
    decrement: emergencyLeaveDec,
  } = useLeaveBalance();

  const {
    increment: accidentLeaveInc,
    balance: accidentLeaveBalance,
    decrement: accidentLeaveDec,
  } = useLeaveBalance();

  return (
    <Card style={styles.container}>
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Sick Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={balance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={balance === 0}
            onPress={decrement}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={increment}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>
      <Divider />
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Vacation Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={vacationLeaveBalance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={vacationLeaveBalance === 0}
            onPress={vacationLeaveDec}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={vacationLeaveInc}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>
      <Divider />
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Emergency Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={emergencyLeaveBalance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={emergencyLeaveBalance === 0}
            onPress={emergencyLeaveDec}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={emergencyLeaveInc}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>
      <Divider />
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Accident Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={accidentLeaveBalance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={accidentLeaveBalance === 0}
            onPress={accidentLeaveDec}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={accidentLeaveInc}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>

      <Divider />
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Maternity Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={accidentLeaveBalance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={accidentLeaveBalance === 0}
            onPress={accidentLeaveDec}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={accidentLeaveInc}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>
      <Divider />
      <HelperText variant="labelLarge" type="info" style={styles.label}>
        Service Incentive Leave
      </HelperText>
      <View style={styles.inputContainer}>
        <AppTextInput
          style={{
            flexGrow: 1,
          }}
          mode="outlined"
          placeholder="Sick leave"
          value={accidentLeaveBalance.toString()}
          keyboardType="numeric"
          defaultValue={"1"}
          readOnly
          right={<TextInput.Affix text="/days" />}
        />

        <View
          style={{
            flexDirection: "row",
          }}
        >
          <IconButton
            disabled={accidentLeaveBalance === 0}
            onPress={accidentLeaveDec}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="minus" {...props} />}
          />

          <IconButton
            onPress={accidentLeaveInc}
            mode="outlined"
            style={{
              backgroundColor: theme.colors.surface,
            }}
            icon={(props) => <CustomIcon name="plus" {...props} />}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    rowGap: 15,
    paddingHorizontal: 20,
    paddingVertical: 20,
    marginBottom: 40,
  },
  inputContainer: {
    gap: 10,
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontWeight: "700",
    fontFamily: "Poppins_500Medium",
  },
});
