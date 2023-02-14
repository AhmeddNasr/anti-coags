import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import drugs from "./drugs";
import theme from "./theme";
import Rivaroxaban from "./drug_dose_adjustment/Rivaroxaban";
import Edoxaban from "./drug_dose_adjustment/Edoxaban";
import Heparin from "./drug_dose_adjustment/Heparin";
import { RadioButton } from "./DoseScreen/components/custom-inputs";
import { CheckboxInput } from "./DoseScreen/components/custom-inputs";
import Apixaban from "./drug_dose_adjustment/Apixaban";
import Enoxaparin from "./drug_dose_adjustment/Enoxaparin";

export default function DrugDoseScreen({ navigation, route }) {
  const [renalAdjustment, setRenalAdjustment] = useState(false);
  const [hepaticAdjustment, setHepaticAdjustment] = useState(false);
  const [adjustment, setAdjustment] = useState("renal");
  const [indication, setIndication] = useState("");
  const [output, setOutput] = useState();
  const [notes, setNotes] = useState([]);
  const drug = drugs[route.params.id];

  const hepaticDrugs = ["edoxaban", "apixaban"];
  const renalDrugs = ["edoxaban", "enoxaparin", "fondaparinux", "apixaban"];

  return (
    <>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ padding: 25, paddingTop: 10, flex: 1 }}>
          {/*  */}
          {/* Indication */}
          {/*  */}
          <Text style={[styles.header, { marginTop: 0 }]}>Indication</Text>
          {drug.indications.map((val, index) => {
            return (
              <RadioButton
                title={
                  val === "dvtp"
                    ? "DVT Prophylaxis"
                    : val === "dvtt"
                    ? "DVT Treatment"
                    : val === "af"
                    ? "Atrial Fibrillation"
                    : val === "hemo"
                    ? "Hemodialysis"
                    : "Monitoring"
                }
                value={val}
                selected={indication}
                setter={setIndication}
                key={"indicationRadio-" + index}
              />
            );
          })}

          {/*  */}
          {/* Adjustment Type */}
          {/*  */}
          {indication.length > 0 && (
            <>
              {drug.name !== "heparin" ? (
                <Text style={styles.header}>Adjustment Type</Text>
              ) : null}
              {drug.name === "rivaroxaban" && (
                <>
                  <RadioButton
                    title="Renal Dose Adjustment"
                    value="renal"
                    selected={adjustment}
                    setter={setAdjustment}
                  />
                  <RadioButton
                    title="Hepatic Dose Adjustment"
                    value="hepatic"
                    selected={adjustment}
                    setter={setAdjustment}
                  />
                </>
              )}
              {renalDrugs.includes(drug.name) && (
                <CheckboxInput
                  title="Renal Dose Adjustment"
                  setter={setRenalAdjustment}
                  value={renalAdjustment}
                />
              )}
              {hepaticDrugs.includes(drug.name) && (
                <CheckboxInput
                  title="Hepatic Dose Adjustment"
                  setter={setHepaticAdjustment}
                  value={hepaticAdjustment}
                />
              )}
              {drug.name !== "rivaroxaban" ? (
                <Text style={styles.header}>Patient information</Text>
              ) : adjustment === "renal" ? (
                <Text style={styles.header}>Patient information</Text>
              ) : null}
              {drug.name === "rivaroxaban" && (
                <Rivaroxaban
                  setOutput={setOutput}
                  indication={indication}
                  adjustment={adjustment}
                />
              )}
              {drug.name === "edoxaban" && (
                <Edoxaban
                  setOutput={setOutput}
                  indication={indication}
                  hepaticAdjustment={hepaticAdjustment}
                  renalAdjustment={renalAdjustment}
                />
              )}
              {drug.name === "apixaban" && (
                <Apixaban
                  setOutput={setOutput}
                  indication={indication}
                  hepaticAdjustment={hepaticAdjustment}
                  renalAdjustment={renalAdjustment}
                />
              )}
              {drug.name === "enoxaparin" && (
                <Enoxaparin
                  setOutput={setOutput}
                  indication={indication}
                  renalAdjustment={renalAdjustment}
                />
              )}
              {drug.name === "heparin" && (
                <Heparin setOutput={setOutput} indication={indication} />
              )}
            </>
          )}
        </View>
        {indication !== "" && output.text !== "" && (
          <View
            style={[
              styles.resultContainer,
              {
                backgroundColor:
                  output?.adjustmentType === 0
                    ? theme.RED_COLOR
                    : output?.adjustmentType === 1
                    ? theme.BLUE_COLOR
                    : theme.GREEN_COLOR,
              },
            ]}
          >
            <Text style={styles.resultMainHeader}>
              {output?.adjustmentType === 0
                ? "Use is contraindicated"
                : "Dose: "}
            </Text>
            {output?.text && (
              <Text style={[styles.resultReason]}>{output?.text}</Text>
            )}
            {output?.reason && (
              <>
                <Text style={[styles.resultHeader]}>
                  {output?.reason ? "Reason for adjustment: " : null}
                </Text>
                <Text style={[styles.resultReason, styles.content]}>
                  {output?.reason}
                </Text>
              </>
            )}

            {typeof output?.params === "object" &&
              output?.params?.length !== 0 && (
                <>
                  <Text style={styles.resultHeader}>
                    Calculated paramaters:{" "}
                  </Text>
                  {output?.params?.map((param, index) => {
                    return (
                      <Text key={"param-" + index} style={styles.resultReason}>
                        {param.title}: {param.value}
                      </Text>
                    );
                  })}
                </>
              )}
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    marginBottom: 15,
    marginTop: 20,
    color: theme.PRIMARY_COLOR,
    fontWeight: "600",
    fontFamily: "inter-font",
  },
  resultMainHeader: {
    color: "black",
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontFamily: "inter-font",
    backgroundColor: "white",
    padding: 10,
    borderRadius: 15,
    marginBottom: 20,
  },
  resultContainer: {
    width: "100%",
    padding: 20,
    backgroundColor: theme.GREEN_COLOR,
    // color: "white",
    minHeight: 100,
    // marginTop: "auto",
    marginTop: "auto",
  },
  resultHeader: {
    color: "white",
    fontSize: theme.FONT_SIZE_EXTRA_LARGE,
    fontWeight: "600",
    fontFamily: "inter-font",
    marginBottom: 10,
  },
  resultDose: {
    color: "white",
    marginBottom: 20,
  },
  resultReason: {
    fontStyle: "italic",
    color: "white",
    marginBottom: 10,
  },
});
