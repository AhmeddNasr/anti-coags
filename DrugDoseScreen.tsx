import { View, Text, Pressable, StyleSheet, ScrollView } from "react-native";
import { useState } from "react";
import { Radio } from "native-base";
import drugs from "./drugs";
import theme from "./theme";
import RenalDoseAdjustment from "./DoseScreen/components/RenalDoseAdjustment";
import HepaticDoseAdjustment from "./DoseScreen/components/HepaticDoseAdjustment";

export default function DrugDoseScreen({ navigation, route }) {
  const [adjustment, setAdjustment] = useState("");
  const [indication, setIndication] = useState("");
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

        {/* Adjustment Type */}
        {indication.length > 0 && (
          <>
            <Text style={styles.header}>2. Adjustment Type:</Text>
            <Radio.Group
              name="adjustmentType"
              accessibilityLabel="adjustment type"
              value={adjustment}
              onChange={(nextValue) => setAdjustment(nextValue)}
            >
              <Radio value="renal" colorScheme="red" my={2}>
                Renal Dose Adjustment
              </Radio>
              <Radio value="hepatic" colorScheme="red" my={2}>
                Hepatic Dose Adjustment
              </Radio>
            </Radio.Group>
          </>
        )}
        {adjustment.length > 0 && (
          <Text style={styles.header}>
            {adjustment === "renal"
              ? "3. Patient Data:"
              : "3. Calculate CHILD score"}
          </Text>
        )}
        {adjustment === "renal" ? (
          <RenalDoseAdjustment drug={drug} indication={indication} />
        ) : adjustment === "hepatic" ? (
          <HepaticDoseAdjustment />
        ) : null}
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
