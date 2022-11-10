import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { Radio, Checkbox, Button } from "native-base";
import drugs from "./drugs";
import theme from "./theme";
import RenalDoseAdjustment from "./DoseScreen/components/RenalDoseAdjustment";
import HepaticDoseAdjustment from "./DoseScreen/components/HepaticDoseAdjustment";
import DoseAdjustment from "./DoseScreen/components/DoseAdjustment";

export default function DrugDoseScreen({ navigation, route }: any) {
  const [adjustment, setAdjustment] = useState(["renal"]);
  const [indication, setIndication] = useState("");
  const [patientData, setPatientData] = useState({});
  const drug = drugs[route.params.id];
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
            <DoseAdjustment
              adjustment={adjustment}
              drug={drug}
              indication={indication}
            />
            <Button
              colorScheme="red"
              my={8}
              // isDisabled={!isFormFilled}
              onPress={() => {
                // let info = {
                //   gfr: calculateGFR(),
                //   weight: weight,
                //   age: age,
                //   bmi: calculateBMI(),
                // };
                // console.log(info);
                // setCalculatedGFR(
                //   calculateDose(props.drug.dose, info, props.indication)
                // );
                // console.log(
                //   calculateDose(props.drug.dose, info, props.indication)
                // );
              }}
            >
              Calculate Dose
            </Button>
          </>
        )}
      </ScrollView>
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
