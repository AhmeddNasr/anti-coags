import { View, Text, StyleSheet } from "react-native";
import drugs from "./drugs";
import theme from "./theme";

export default function HemodialysisScreen() {
  const hemodialysisCompatibleDrugs = [];
  const hemodialysisInCompatibleDrugs = [];

  return (
    <View>
      <Text>Compatible with hemodialysis</Text>
      <View></View>
      <Text>Contraindicated with hemodialysis</Text>
      <View></View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 15,
    marginTop: 20,
  },
});
