import { useState } from "react";
import {
  AgeInput,
  GenderInput,
  WeightInput,
  ScrInput,
  SubmitButton,
} from "../DoseScreen/components/custom-inputs";
import calculateGFR from "../Utils/calculateGFR";

export default function Apixaban(props) {
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [scr, setScr] = useState(null);
  const [gender, setGender] = useState(null);

  const calculate = () => {
    const gfr = calculateGFR(gender, age, weight, scr);
    if (props.indication === "af") {
      if (
        gfr < 30 ||
        (scr < 1.5 && age >= 80 && weight <= 60) ||
        (scr >= 1.5 && (age > 80 || weight > 60))
      ) {
        props.setOutput({
          adjustmentType: 1,
          text: "2.5 mg twice daily",
        });
      } else {
        props.setOutput({
          text: "5 mg twice daily",
        });
      }
    } else if (indication === "dvtt") {
      props.setOutput({
        text: "10 mg twie daily for 7 days followed by 5 mg twice daily.",
      });
    } else {
      props.setOutput({
        text: "2.5 mg twice daily beginning 12 to 24 hours.",
      });
    }
  };

  return (
    <>
      <AgeInput setter={setAge} />
      <WeightInput setter={setWeight} />
      <ScrInput setter={setScr} />
      <GenderInput setter={setGender} value={gender} />
      <SubmitButton calculate={calculate} />
    </>
  );
}