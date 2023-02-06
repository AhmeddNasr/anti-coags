import { useState, useEffect } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import calculateBmi from "../Utils/calculateBmi";
export default function Enoxaparin(props) {
  const [weight, setWeight] = useState(props.data?.weight || "");
  const [height, setHeight] = useState(props.data?.height || "");
  const [age, setAge] = useState(props.data?.age || "");
  const [scr, setScr] = useState(props.data?.scr || "");
  const [gender, setGender] = useState(props.data?.gender || "m");

  //TODO ADD NOTE
  const calculate = () => {
    let gfr = calculateGFR(gender, age, weight, scr);
    let text = "";
    let bmi = calculateBmi(weight, height);
    console.log(gfr);
    if (gfr < 15 && props.renalAdjustment) {
      props.setOutput({
        adjustmentType: 0,
        reason: "Avoid use with GFR < 15 [Calculated GFR: " + gfr + "ml/min]",
      });
    } else if (gfr < 30 && props.renalAdjustment) {
      if (props.indication === "dvtp") {
        text = "30 mg SC once daily.";
      } else {
        text = "1mg/kg SC [" + weight + "mg] once daily";
      }
      props.setOutput({
        adjustmentType: 1,
        reason: "GFR < 15 [Calculated GFR: " + gfr + "ml/min]",
        text,
      });
    } else if (props.indication === "dvtp") {
      if (bmi > 50) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI > 50 kg/m2 [Calculated BMI: " + bmi + "]",
          text: "60 mg twice daily or 0.5 mg/kg [" + 0.5 * weight + "mg]",
        });
      } else if (bmi >= 40) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI >= 40 kg/m2 [Calculated BMI: " + bmi + "]",
          text: "40mg twice daily or 0.5 mg/kg [" + 0.5 * weight + "mg]",
        });
      } else {
        props.setOutput({
          text: "40 mg once daily",
        });
      }
    } else if (props.indication === "dvtt") {
      if (bmi >= 114) {
        //TODO
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI is over 110 kg/m2 [Calculated BMI: " + bmi + " kg/m2]",
          text:
            "Dose lower than 0.7 mg/kg twice daily [" +
            0.7 * weight +
            " mg] may be indicated",
        });
      } else if (bmi >= 50) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI > 50 kg/m2 [Calculated BMI: " + bmi + " kg/m2]",
          text:
            "Use lower end of dosing range (0.7mg/kg - 1mg/kg) twice daily [" +
            0.7 * weight +
            "mg - " +
            weight +
            "mg]",
        });
      } else if (bmi >= 30) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI > 30 kg/m2 [Calculated BMI: " + bmi + "]",
          text: "1 mg/kg [" + weight + "mg] every 12 hours",
        });
      } else {
        props.setOutput({
          text: weight
            ? "1 mg/kg [" +
              weight +
              "mg] every 12 hours (preferred) or 1.5 mg/kg once every 24 hours subcutaneously"
            : "1 mg/kg every 12 hours (preferred) or 1.5 mg/kg once every 24 hours subcutaneously",
        });
      }
    }
  };

  return (
    <GenerateInputs
      age={age}
      setAge={setAge}
      scr={scr}
      setScr={setScr}
      gender={gender}
      setGender={setGender}
      weight={weight}
      setWeight={setWeight}
      height={height}
      setHeight={setHeight}
      calculate={calculate}
      renalAdjustment={props.renalAdjustment}
      renalOnlyParams={["age"]}
    />
  );
}
