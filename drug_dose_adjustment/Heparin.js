import { useState } from "react";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import calculateBmi from "../Utils/calculateBmi";
import calculateAdjustedBW from "../Utils/calculateAdjustedBW";
export default function Enoxaparin(props) {
  const [weight, setWeight] = useState(props.data?.weight || "");
  const [height, setHeight] = useState(props.data?.height || "");
  const [gender, setGender] = useState("m");
  const [aptt, setAptt] = useState("");
  function calculate() {
    let bmi = calculateBmi(weight, height);
    let adjustedBW = calculateAdjustedBW(weight, height, gender);
    console.log(bmi);
    if (props.indication === "af") {
      if (bmi > 40) {
        let dose60 = 60 * adjustedBW > 5000 ? 5000 : 60 * adjustedBW;
        let dose80 = 80 * adjustedBW > 5000 ? 5000 : 80 * adjustedBW;
        let dose12 = 12 * adjustedBW;
        let dose18 = 18 * adjustedBW;
        // console.log("hi");
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI > 40 kg/m2, [ calculated BMI: " + bmi + " kg/m2 ]",
          text:
            "Initial bolus of 60 to 80 units/kg [ " +
            dose60.toFixed(0) +
            " to " +
            dose80.toFixed(0) +
            "units ]\nFollowed by a continious infusion of 12 to 18 units/kg/hour [ " +
            dose12.toFixed(0) +
            " - " +
            dose18.toFixed(0) +
            " units/hour]",
        });
      } else {
        return;
      }
    }
  }
  return (
    <GenerateInputs
      weight={weight}
      setWeight={setWeight}
      height={height}
      setHeight={setHeight}
      gender={gender}
      setGender={setGender}
      calculate={calculate}
      aptt={aptt}
      setAptt={setAptt}
      indication={props.indication}
      renalOnlyParams={[]}
      renalAdjustment={false}
      hepaticAdjustment={false}
    />
  );
}
