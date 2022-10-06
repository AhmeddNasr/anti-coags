import { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import drugs from "./drugs";
import theme from "./theme";

export default function HemodialysisScreen() {
  const [drugsSorted, setDrugsSorted] = useState({
    compatible: [],
    incompatible: [],
  });
  const hemodialysisCompatibleDrugs = [];
  const hemodialysisInCompatibleDrugs = [];

  useEffect(() => {
    drugs.forEach((drug) => {
      if (drug.dialysis) {
        hemodialysisCompatibleDrugs.push({ name: drug.name, id: drug.id });
      } else {
        hemodialysisInCompatibleDrugs.push({ name: drug.name, id: drug.id });
      }
    });
    setDrugsSorted({
      compatible: hemodialysisCompatibleDrugs,
      incompatible: hemodialysisInCompatibleDrugs,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Compatible with hemodialysis</Text>
      <View>
        {Object.keys(drugsSorted).length !== 0
          ? drugsSorted.compatible.map((drug, index) => {
              return <Text key={index}>{drug.name}</Text>;
            })
          : null}
      </View>
      <Text style={styles.header}>Contraindicated with hemodialysis</Text>
      <View>
        {Object.keys(drugsSorted).length !== 0
          ? drugsSorted.incompatible.map((drug, index) => {
              return <Text key={index}>{drug.name}</Text>;
            })
          : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 15,
    marginTop: 20,
  },
});
