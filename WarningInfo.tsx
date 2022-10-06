import { Text, View, StyleSheet, ScrollView } from "react-native";
import theme from "./theme";
import drugs from "./drugs";

export default function WarningInfo({ route }) {
  const drug = drugs[route.params.id];
  return (
    <View style={{ margin: 20 }}>
      <ScrollView>
        <Text style={[styles.header, { marginTop: 0 }]}>Warnings: </Text>
        {drug.warning.map((warning, index) => {
          return (
            <Text key={index}>
              {index + 1}. {warning}
            </Text>
          );
        })}

        <Text style={styles.header}>Precautions</Text>
        {drug.precaution.map((precaution, index) => {
          return (
            <Text key={index}>
              {index + 1}. {precaution}
            </Text>
          );
        })}

        <Text style={styles.header}>Contraindications</Text>
        {drug.contra.map((contra, index) => {
          return (
            <Text key={index}>
              {index + 1}. {contra}
            </Text>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 20,
    marginTop: 20,
  },
});
