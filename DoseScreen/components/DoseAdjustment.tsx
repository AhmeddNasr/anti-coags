import RenalDoseAdjustment from "./RenalDoseAdjustment";
import HepaticDoseAdjustment from "./HepaticDoseAdjustment";
import { StyleSheet, Text } from "react-native";
import theme from "../../theme";

// drug, adjustment, indication
export default function DoseAdjustment(props: any) {
  let dose = props.drug.dose[0];
  let params = dose.adjustmentParams;
  // if (props.indication === "af") {
  //   params = dose.AFAdjustmentParams;
  // } else if (props.indication === "dvtp") {
  //   params = dose.DVTPAdjustmentParams;
  // } else {
  //   params = dose.DVTTAdjustmentParams;
  // }
  console.log(params);
  return (
    <>
      <Text style={styles.header}>3. Patient Data:</Text>
      <RenalDoseAdjustment params={params} />
      {props.adjustment.includes("hepatic") && (
        <>
          <Text style={styles.header}>4. CHILD-PUGH Score:</Text>
          <HepaticDoseAdjustment />
        </>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: theme.FONT_SIZE_LARGE,
    marginBottom: 15,
    marginTop: 20,
  },
});
