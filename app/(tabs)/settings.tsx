import ListItem from "@/components/Settings/components/ListItems";
import Profile from "@/components/Settings/components/Profile";
import { View } from "@/components/Themed";
import { useHeaderHeight } from "@react-navigation/elements";
import { ScrollView, StyleSheet } from "react-native";

export default function SettingsScreen() {
  const height = useHeaderHeight();
  return (
    <View style={[styles.container, { paddingTop: height + 20 }]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Profile />
        <View style={{ marginTop: 30, flex: 1, rowGap: 10 }}>
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
          <ListItem label="Light/Dark theme" path={"/settings"} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    gap: 10,
  },
});
