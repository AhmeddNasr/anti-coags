import { useState, useEffect } from "react";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import calculateBmi from "../Utils/calculateBmi";
import calculateAdjustedBW from "../Utils/calculateAdjustedBW";
export default function Enoxaparin(props) {
  const [weight, setWeight] = useState(props.data?.weight || "");
  const [height, setHeight] = useState(props.data?.height || "");
  const [gender, setGender] = useState("m");
  const [hemodialysis, setHemodialysis] = useState(false);
  const [aptt, setAptt] = useState("");

  useEffect(() => {
    setAptt("");
    calculate();
  }, [props.indication]);

  function calculate() {
    let bmi;
    let adjustedBW;
    let bmiCalculated = false;

    if (weight !== "" && height !== "") {
      bmi = calculateBmi(weight, height);
      adjustedBW = calculateAdjustedBW(weight, height, gender);
      bmiCalculated = true;
    }
    let weightUsed;
    if (bmi > 40) {
      weightUsed = adjustedBW;
    } else {
      weightUsed = weight;
    }
    let dose60 = 60 * weightUsed > 5000 ? 5000 : 60 * weightUsed;
    let dose80 = 80 * weightUsed > 5000 ? 5000 : 80 * weightUsed;
    let dose12 = 12 * weightUsed;
    let dose18 = 18 * weightUsed;
    // console.log(bmi);
    if (hemodialysis && props.indication !== "monitoring") {
      if (bmiCalculated) {
        props.setOutput({
          adjustmentType: 1,
          reason: "Patient is on dialysis",
          text: `Dose reduction by 33%: loading dose 60 IU/kg [ ${
            60 * weightUsed
          } IU ], maintenance 12 IU/kg/h [ ${
            12 * weightUsed
          } IU ], subsequent aPTT-adjusted dosing`,
        });
      } else {
        props.setOutput({
          adjustmentType: 1,
          text: "Dose reduction by 33%: loading dose 60 IU/kg, maintenance 12 IU/kg/h, subsequent aPTT-adjusted dosing",
        });
      }
    } else if (props.indication === "af") {
      let text =
        "Initial bolus of 60 to 80 units/kg [ " +
        dose60.toFixed(0) +
        " to " +
        dose80.toFixed(0) +
        "units ]\nFollowed by a continuous infusion of 12 to 18 units/kg/hour [ " +
        dose12.toFixed(0) +
        " - " +
        dose18.toFixed(0) +
        " units/hour ]";
      if (bmi >= 40 && bmiCalculated) {
        // console.log("hi");
        props.setOutput({
          adjustmentType: 1,
          reason: "Adjusted bodyweight is used with BMI ≥ 40 kg/m2",
          text,
        });
      } else if (bmiCalculated) {
        props.setOutput({
          text,
        });
      } else {
        props.setOutput({
          text: "Initial bolus of 60 to 80 units/kg\nFollowed by a continuous infusion of 12 to 18 units/kg/hour ",
        });
      }
    } else if (props.indication === "dvtt") {
      let text = `IV: Initial: 80 units/kg [ ${dose80} units ] bolus followed by a continuous infusion of 18 units/kg/hour [ ${dose80} units/hour ] or 5,000 unit bolus followed by 1,333 units/hour.`;
      if (bmiCalculated && bmi >= 40) {
        props.setOutput({
          adjustmentType: 1,
          text,
          reason: "Adjusted bodyweight is used with BMI ≥ 40 kg/m2",
        });
      } else {
        props.setOutput({
          text:
            weight !== ""
              ? text
              : "IV: Initial: 80 units/kg bolus followed by a continuous infusion of 18 units/kg/hour or 5,000 unit bolus followed by 1,333 units/hour.",
        });
      }
    } else if (props.indication === "dvtp") {
      if (bmiCalculated && bmi > 50) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI > 50 Kg/m2",
          text: "7500 units every 8 hours",
        });
      } else if (bmiCalculated && bmi >= 30) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI ≥ 30 Kg/m2",
          text: "SUBQ: 5,000 to 7,500 units every 8 hours",
        });
      } else {
        props.setOutput({
          text: "SUBQ: 5,000 to 7,500 units every 8 hours",
        });
      }
    } else if (props.indication === "monitoring") {
      let text = "";
      if (aptt > 150) {
        text =
          "Stop infusion for 2 hours, then decrease by 5 units/kg/hour and notify clinician\nRepeat assay 6 hours after restarting the infusion ";
      } else if (aptt > 141) {
        text =
          "Stop infusion for 2 hours, then decrease by 4 units/kg/hour.\nRepeat assay 6 hours after restarting the infusion ";
      } else if (aptt > 131) {
        text =
          "Stop infusion for 1 hour, then decrease by 3 units/kg/hour\nRepeat assay 6 hours after restarting the infusion ";
      } else if (aptt > 121) {
        text =
          "Stop infusion for 1 hour, then decrease by 2 units/kg/hour.\nRepeat assay 6 hours after restarting the infusion ";
      } else if (aptt > 111) {
        text = "Decrease infusion by 1 unit/kg/hour Repeat assay in 6 hours.";
      } else if (aptt > 70) {
        text =
          "No change (within therapeutic range)\nRepeat assay in 6 hours\nOnce therapeutic for 2 consecutive assays, may change to once-daily assays.";
      } else if (aptt > 50) {
        text = "Increase infusion by 1 unit/kg/hour\nRepeat assay in 6 hours.";
      } else if (aptt > 40) {
        text = "Increase infusion by 2 units/kg/hour\nRepeat assay in 6 hours.";
      } else if (aptt > 0) {
        text =
          "Bolus 25 units/kg\nIncrease infusion by 3 units/kg/hour\nRepeat assay in 6 hours";
      }
      props.setOutput({
        adjustmentType: 1,
        text,
      });
    }

    if (bmiCalculated && props.indication !== "monitoring") {
      props.setOutput((prevState) => ({
        ...prevState,
        params: [{ title: "BMI", value: bmi + " Kg/m2" }],
      }));
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
      renalAdjustment={true}
      hepaticAdjustment={false}
      hemodialysis={hemodialysis}
      setHemodialysis={setHemodialysis}
    />
  );
}
