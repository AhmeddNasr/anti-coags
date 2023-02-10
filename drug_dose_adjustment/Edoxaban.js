import { Text } from "react-native";
import { useState, useEffect } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";

export default function Edoxaban(props) {
  const [weight, setWeight] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [scr, setScr] = useState("");
  const [gender, setGender] = useState("m");
  const [pgp, setPgp] = useState(false);
  const [nsaid, setNsaid] = useState(false);
  const [antiplatelet, setAntiplatelet] = useState(false);
  const [bleeding, setBleeding] = useState(false);
  const [hepatic, setHepatic] = useState(null);

  const defaultOutput = {
    af: "60 mg once daily",
    dvtt: `> 60kg: 60 mg once daily \n ≤ 60kg: 30 mg once daily`,
  };

  useEffect(() => {
    if (props.indication === "af") {
      props.setOutput({ text: defaultOutput.af });
    } else if (props.indication === "dvtt") {
      props.setOutput({ text: defaultOutput.dvtt });
    } else {
      props.setOutput({ text: defaultOutput.dvtp });
    }
  }, [props.indication]);

  const calculate = () => {
    let gfr;
    if (!props.renalAdjustment) {
      gfr = 80;
    } else {
      gfr = calculateGFR(gender, age, weight, scr);
    }

    const bmi = weight / Math.pow(height / 100, 2);

    if (hepatic >= 7) {
      props.setOutput({
        adjustmentType: 0,
        reason:
          "Avoid use with moderate to severe impairment (Child-Pugh class B or C) and any hepatic disease associated with coagulopathy.\n [Child-Pugh score: " +
          hepatic +
          " ]",
      });
    }
    // contraindications
    if (bmi > 40 || weight > 120 || gfr > 95 || gfr < 15) {
      if (bmi > 40 || weight > 120) {
        return props.setOutput({
          adjustmentType: 0,
          reason:
            "Use should be avoided for patients with BMI >40 kg/m2 % or weight >120 kg [ BMI: " +
            bmi +
            " ]",
          variables: [bmi, weight],
        });
      } else {
        return props.setOutput({
          adjustmentType: 0,
          reason:
            "Use should be avoided for patients with a GFR > 95mL/min or < 15mL/min [ Calculated GFR: " +
            gfr +
            " ]",
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
      }
      if (gfr < 50) {
        return props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
          reason: "GFR < 50 mL/min [ Calculated GFR: " + gfr + " mL/min ]",
        });
      }
      if (age >= 65 && (weight >= 60 || pgp || gfr <= 50)) {
        return props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
          reason:
            "Age >= 65 and one of the following: weight > 60, GFR < 50, Use of P-gp inhibitors",
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
          reason:
            "Weight < 60 or GFR < 50 [ Calculated GFR: " + gfr + " mL/min ]",
        });
      }
      return props.setOutput({
        text: "30 mg once daily",
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
        setHeight={setHeight}
        height={height}
        setScr={setScr}
        scr={scr}
        setGender={setGender}
        gender={gender}
        pgp={{ setter: setPgp, value: pgp }}
        nsaid={{ setter: setNsaid, value: nsaid }}
        platelet={{ setter: setAntiplatelet, value: antiplatelet }}
        bleeding={{ setter: setBleeding, value: bleeding }}
        calculate={calculate}
        hepaticAdjustment={props.hepaticAdjustment}
        setHepatic={setHepatic}
        renalAdjustment={props.renalAdjustment}
        renalOnlyParams={["age", "gender"]}
        indication={props.indication}
      />
    </>
  );
}
