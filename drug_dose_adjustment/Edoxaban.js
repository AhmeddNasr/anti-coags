import { Text } from "react-native";
import { useState, useEffect } from "react";
import {
  AgeInput,
  GenderInput,
  WeightInput,
  ScrInput,
  SubmitButton,
  ConcamitantPgpInput,
  NsaidUseInput,
  AntiplateletUseInput,
  BleedingHistoryInput,
  HeightInput,
  Label,
} from "../DoseScreen/components/custom-inputs";
import calculateGFR from "../Utils/calculateGFR";

export default function Edoxaban(props) {
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [height, setHeight] = useState(null);
  const [scr, setScr] = useState(null);
  const [gender, setGender] = useState(null);
  const [pgp, setPgp] = useState(false);
  const [nsaid, setNsaid] = useState(false);
  const [antiplatelet, setAntiplatelet] = useState(false);
  const [bleeding, setBleeding] = useState(false);

  const calculate = () => {
    const gfr = calculateGFR(gender, age, weight, scr);
    const bmi = weight / Math.pow(height / 100, 2);
    // contraindications
    if (bmi > 40 || weight > 120 || gfr > 95 || gfr < 15) {
      if (bmi > 40 || weight > 120) {
        return props.setOutput({
          adjustmentType: 0,
          reason:
            "Use should be avoided for patients with BMI >40 kg/m2 % or weight >120 kg %",
          variables: [bmi, weight],
        });
      } else {
        return props.setOutput({
          adjustmentType: 0,
          reason:
            "Use should be avoided for patients with a GFR > 95mL/min or < 15mL/min %",
          variables: [gfr],
        });
      }
    }

    // AF indication
    if (props.indication === "af") {
      if (age >= 80 || weight <= 60) {
        if (gfr < 30 || bleeding || antiplatelet || antiplatelet) {
          return props.setOutput({
            adjustmentType: 1,
            text: "15 mg once daily",
          });
        }
      } else if (age >= 65 && (weight >= 60 || pgp || gfr <= 50)) {
        return props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
        });
      }
      if (gfr < 50) {
        return props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
        });
      }
      return props.setOutput({
        text: "60 mg once daily",
      });
    }

    // DVT treatment
    else {
      if (weight <= 60 || gfr < 50) {
        return props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
        });
      }
      return props.setOutput({
        text: "30 mg once daily",
      });
    }
  };

  return (
    <>
      <AgeInput setter={setAge} />
      <WeightInput setter={setWeight} />
      <HeightInput setter={setHeight} />
      <ScrInput setter={setScr} />
      <GenderInput setter={setGender} value={gender} />
      <Label title={"History"} />
      <ConcamitantPgpInput setter={setPgp} value={pgp} />
      <NsaidUseInput setter={setNsaid} value={nsaid} />
      <AntiplateletUseInput setter={setAntiplatelet} value={antiplatelet} />
      <BleedingHistoryInput setter={setBleeding} value={bleeding} />
      {/* <Text>
        indication: {props.indication}, age: {age}
      </Text> */}
      <SubmitButton calculate={calculate} />
    </>
  );
}
