import { StyleSheet, Text, View } from "react-native";
import { Button } from "native-base";
import { CustomButton } from "./DoseScreen/components/custom-inputs";
import drugs from "./drugs";
import theme from "./theme";

const oralDrugs = [
  [
    { name: "rivaroxaban", id: 0 },
    { name: "edoxaban", id: 1 },
  ],
  [
    { name: "apixaban", id: 2 },
    { name: "warfarin", id: 5 },
  ],
];
const parentralDrugs = [
  [
    { name: "enoxaparin", id: 3 },
    { name: "heparin", id: 4 },
  ],
  [{ name: "fondaparinux", id: 6 }],
];

export default function DoseScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Oral anti-coagulants</Text>
      </View>
      {oralDrugs.map((group, groupIndex) => {
        return (
          <View style={styles.group} key={"oral-group-" + groupIndex}>
            {group.map((drug, index) => {
              return (
                <View style={{ marginRight: index % 2 === 0 ? 20 : 0 }}>
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
                </View>
              );
            })}
          </View>
        );
      })}
      <View style={styles.titleContainer}>
        <Text style={[styles.title, { marginTop: 30 }]}>
          Parentral anti-coagulants
        </Text>
      </View>
      {parentralDrugs.map((group, groupIndex) => {
        return (
          <View style={styles.group} key={"parentral-group-" + groupIndex}>
            {group.map((drug, index) => {
              return (
                <View style={{ marginRight: index % 2 === 0 ? 20 : 0 }}>
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
                </View>
              );
            })}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // justifyContent: "center",
    // alignContent: "center",
    // alignItems: "center",
    margin: 30,
    marginTop: 0,
  },
  titleContainer: {
    // padding: 20,
    marginBottom: 10,
    marginTop: 10,
  },
  title: { fontSize: theme.FONT_SIZE_LOGO, marginBottom: 20 },
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
  group: {
    flexDirection: "row",
  },
});
