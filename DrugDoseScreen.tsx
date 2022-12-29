import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState, useEffect } from "react";
import { Radio, Checkbox, Button } from "native-base";
import drugs from "./drugs";
import theme from "./theme";
import RenalDoseAdjustment from "./DoseScreen/components/RenalDoseAdjustment";
import HepaticDoseAdjustment from "./DoseScreen/components/HepaticDoseAdjustment";
import DoseAdjustment from "./DoseScreen/components/DoseAdjustment";
import Rivaroxaban from "./drug_dose_adjustment/Rivaroxaban";
import Edoxaban from "./drug_dose_adjustment/Edoxaban";

export default function DrugDoseScreen({ navigation, route }) {
  const [adjustment, setAdjustment] = useState(["renal"]);
  const [indication, setIndication] = useState("");
  const [output, setOutput] = useState();
  const drug = drugs[route.params.id];

  useEffect(() => {
    console.log(output);
  }, [output]);

  return (
    <View style={{ margin: 20 }}>
      <ScrollView>
        {/* Indication */}
        <Text style={[styles.header, { marginTop: 0 }]}>1. Indication: </Text>
        <Radio.Group
          name="indication"
          accessibilityLabel="indication"
          value={indication}
          onChange={(nextValue) => setIndication(nextValue)}
        >
          {drug.indications.map((indication, index) => {
            return (
              <Radio colorScheme="red" value={indication} key={index} my={2}>
                {indication === "dvtp"
                  ? "DVT prophylaxis"
                  : indication === "dvtt"
                  ? "DVT treatment"
                  : "AF"}
              </Radio>
            );
          })}
        </Radio.Group>

        {indication.length > 0 && (
          <>
            <Text style={styles.header}>2. Adjustment Type:</Text>
            {/* TODO remove nativebase */}
            <Checkbox.Group
              onChange={(value) => setAdjustment(value)}
              value={adjustment}
            >
              <Checkbox value="renal" colorScheme="red" my={2} isDisabled>
                Renal Dose Adjustment
              </Checkbox>
              <Checkbox value="hepatic" colorScheme="red" my={2}>
                Hepatic Dose Adjustment
              </Checkbox>
            </Checkbox.Group>
            {/* Renal and Hepatic */}
            {/* <DoseAdjustment
              adjustment={adjustment}
              drug={drug}
              indication={indication}
            /> */}
            {drug.name === "rivaroxaban" ? (
              <Rivaroxaban setOutput={setOutput} indication={indication} />
            ) : (
              <Edoxaban setOutput={setOutput} indication={indication} />
            )}
          </>
        )}
      </ScrollView>
      <View>
        <Text>{output?.text}</Text>
        <Text>{output?.reason}</Text>
      </View>
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
