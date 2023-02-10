import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { CustomButton } from "./DoseScreen/components/custom-inputs";
import drugs from "./drugs";
import theme from "./theme";

const oralDrugs = [
  { name: "rivaroxaban", id: 0 },
  { name: "edoxaban", id: 1 },
  { name: "apixaban", id: 2 },
  { name: "warfarin", id: 5 },
];
const parentralDrugs = [
  { name: "enoxaparin", id: 3 },
  { name: "heparin", id: 4 },
  { name: "fondaparinux", id: 6 },
];

export default function DoseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Oral anti-coagulants</Text>
      </View>
      {oralDrugs.map((drug, index) => {
        return (
          <CustomButton
            handlePress={() => {
              navigation.navigate("DrugDose", {
                id: drug.id,
                name: drug.name,
              });
            }}
            title={drug.name}
            key={"oral-" + index}
          />
        );
      })}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Parentral anti-coagulants</Text>
      </View>
      {parentralDrugs.map((drug, index) => {
        console.log(drug);
        return (
          <CustomButton
            handlePress={() => {
              navigation.navigate("DrugDose", {
                id: drug.id,
                name: drug.name,
              });
            }}
            title={drug.name}
            key={"parentral-" + index}
          />
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignContent: "center",
    alignItems: "center",
  },
  titleContainer: {
    padding: 20,
    margin: 0,
  },
  title: { fontSize: 20 },
  Button: {
    borderColor: "gray",
    marginTop: 20,
    padding: 30,
    paddingRight: 10,
    paddingLeft: 10,
    backgroundColor: theme.PRIMARY_COLOR,
    alignItems: "center",
    justifyContent: "center",
    width: 130,
  },
  ButtonActive: {
    backgroundColor: "orange",
  },
  ButtonText: {
    color: "white",
  },
});
