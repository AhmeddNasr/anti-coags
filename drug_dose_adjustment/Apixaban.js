import { useState } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";

export default function Apixaban(props) {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [scr, setScr] = useState("");
  const [gender, setGender] = useState("m");
  const [hepatic, setHepatic] = useState(null);

  const calculate = () => {
    const gfr = calculateGFR(gender, age, weight, scr);
    if (props.hepaticAdjustment && hepatic >= 10) {
      return props.setOutput({
        adjustmentType: 0,
        reason:
          "Avoid use with severe impairment (Child-Pugh class C) [Child-Pugh score: " +
          hepatic +
          " ]",
      });
    }
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
      <GenerateInputs
        setAge={setAge}
        age={age}
        setWeight={setWeight}
        weight={weight}
        setScr={setScr}
        scr={scr}
        setGender={setGender}
        gender={gender}
        renalAdjustment={props.renalAdjustment}
        hepaticAdjustment={props.hepaticAdjustment}
        setHepatic={setHepatic}
        calculate={calculate}
      />
    </>
  );
}
