import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Radio, Checkbox } from "native-base";
import drugs from "./drugs";
import theme from "./theme";
import Rivaroxaban from "./drug_dose_adjustment/Rivaroxaban";
import Edoxaban from "./drug_dose_adjustment/Edoxaban";
import { RadioButton } from "./DoseScreen/components/custom-inputs";
import { CheckboxInput } from "./DoseScreen/components/custom-inputs";

export default function DrugDoseScreen({ navigation, route }) {
  const [renalAdjustment, setRenalAdjustment] = useState(true);
  const [hepaticAdjustment, setHepaticAdjustment] = useState(false);
  const [indication, setIndication] = useState("");
  const [output, setOutput] = useState();
  const drug = drugs[route.params.id];

  useEffect(() => {
    console.log(output);
  }, [output]);

  return (
    <>
      <ScrollView>
        <View style={{ padding: 25, paddingTop: 10, flex: 1 }}>
          {/*  */}
          {/* Indication */}
          {/*  */}
          <Text style={[styles.header, { marginTop: 0 }]}>Indication: </Text>
          {drug.indications.map((val, index) => {
            return (
              <RadioButton
                title={
                  val === "dvtp"
                    ? "DVT Prophylaxis"
                    : val === "dvtt"
                    ? "DVT Treatment"
                    : "Atrial Fibrillation"
                }
                value={val}
                selected={indication}
                setter={setIndication}
              />
            );
          })}

          {/*  */}
          {/* Adjustment Type */}
          {/*  */}
          {indication.length > 0 && (
            <>
              <Text style={styles.header}>Adjustment Type:</Text>
              {/* TODO remove nativebase */}
              <CheckboxInput
                title="Renal Dose Adjustment"
                setter={setRenalAdjustment}
                value={renalAdjustment}
              />
              <CheckboxInput
                title="Hepatic Dose Adjustment"
                setter={setHepaticAdjustment}
                value={hepaticAdjustment}
              />
              <Text style={styles.header}>Patient information:</Text>
              {drug.name === "rivaroxaban" ? (
                <Rivaroxaban setOutput={setOutput} indication={indication} />
              ) : (
                <Edoxaban setOutput={setOutput} indication={indication} />
              )}
            </>
          )}
        </View>
        {indication !== "" && (
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
            <Text style={styles.resultHeader}>
              {output?.adjustmentType === 0
                ? "Use is contraindicated"
                : "Dose: "}
            </Text>
            {output?.text && (
              <Text style={styles.resultDose}>{output?.text}</Text>
            )}
            <Text style={styles.resultReason}>
              {output?.reason ? "Reason for adjustment: " : null}
              {output?.reason}
            </Text>
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
  },
  resultContainer: {
    width: "100%",
    padding: 20,
    // position: "absolute",
    bottom: 0,
    backgroundColor: theme.GREEN_COLOR,
    // color: "white",
    minHeight: 100,
  },
  resultHeader: {
    color: "white",
    fontSize: theme.FONT_SIZE_LARGE,
    fontWeight: "600",
    marginBottom: 10,
  },
  resultDose: {
    color: "white",
    marginBottom: 20,
  },
  resultReason: {
    fontStyle: "italic",
    color: "white",
  },
});
