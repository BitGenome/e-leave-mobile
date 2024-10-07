import { ActivityIndicator } from "react-native-paper";
import { CenteredView } from "./CenteredView";
import { ViewProps } from "react-native-svg/lib/typescript/fabric/utils";

export const Loading = (props: ViewProps) => {
  return (
    <CenteredView {...props}>
      <ActivityIndicator />
    </CenteredView>
  );
};
