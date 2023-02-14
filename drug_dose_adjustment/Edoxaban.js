import { Text } from "react-native";
import { useState, useEffect } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import calculateBmi from "../Utils/calculateBmi";

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
  const [hemodialysis, setHemodialysis] = useState(false);

  // const defaultOutput = {
  //   af: "60 mg once daily",
  //   dvtt: `> 60kg: 60 mg once daily \n ≤ 60kg: 30 mg once daily`,
  // };

  useEffect(() => {
    // if (props.indication === "af") {
    //   props.setOutput({ text: defaultOutput.af });
    // } else if (props.indication === "dvtt") {
    //   props.setOutput({ text: defaultOutput.dvtt });
    // } else {
    //   props.setOutput({ text: defaultOutput.dvtp });
    // }
    calculate();
  }, [props.indication, hemodialysis]);

  const calculate = () => {
    let gfr;
    let gfrCalculated = false;

    if (
      !props.renalAdjustment ||
      gender === "" ||
      age === "" ||
      weight === "" ||
      scr === ""
    ) {
      gfr = 80;
    } else {
      gfr = calculateGFR(gender, age, weight, scr);
      gfrCalculated = true;
    }

    let bmi;
    let bmiCalculated = false;

    if (weight !== "" || height !== "") {
      bmi = calculateBmi(weight, height);
      bmiCalculated = true;
    }
    // hemodialysis
    if (hemodialysis) {
      props.setOutput({
        adjustmentType: 0,
        reason: "Edoxaban is not used in hemodialysis",
      });
      // hepatic
    } else if (hepatic >= 7) {
      props.setOutput({
        adjustmentType: 0,
        reason:
          "Avoid use with moderate to severe impairment (Child-Pugh class B or C) and any hepatic disease associated with coagulopathy.",
      });
      //
    } else if (bmi > 40 || weight > 120) {
      props.setOutput({
        adjustmentType: 0,
        reason:
          "Use should be avoided for patients with BMI > 40 kg/m2 or weight > 120 kg",
      });
    } else if (gfr > 95 || gfr < 15) {
      props.setOutput({
        adjustmentType: 0,
        reason:
          "Use should be avoided for patients with a GFR > 95 mL/min or < 15 mL/min",
      });
    }

    // AF indication
    else if (props.indication === "af") {
      if (weight != "" && (age >= 80 || weight <= 60)) {
        if (gfr < 30 || bleeding || antiplatelet || antiplatelet) {
          props.setOutput({
            adjustmentType: 1,
            text: "15 mg once daily",
            reason:
              "Age ≥ 80 or Weight ≤ 60 kg + one of the following: CrCl <30 mL/minute, history of GI bleeding, concurrent use of antiplatelet, continuous use of NSAIDs",
          });
        }
      } else if (gfr < 50) {
        console.log("hi2");
        props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
          reason: "GFR < 50 mL/min",
        });
      } else if (age >= 65 && (weight <= 60 || pgp || gfr <= 50)) {
        props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
          reason:
            "Age ≥ 65 + one of the following: weight > 60, GFR < 50 mL/min, Use of P-gp inhibitors",
        });
      } else {
        props.setOutput({
          text: "60 mg once daily",
        });
      }
    }

    // DVT treatment
    else {
      if (gfr < 50) {
        props.setOutput({
          adjustmentType: 1,
          text: "30 mg once daily",
          reason: "CrCl 15 to 50 mL/min",
        });
      } else if (weight > 60) {
        props.setOutput({
          text: "60 mg once daily",
        });
      } else if (weight <= 60 && weight != "") {
        props.setOutput({
          text: "30 mg once daily",
        });
      } else {
        props.setOutput({
          text: "> 60 Kg: 60 mg once daily\n< 60 Kg: 30 mg once daily",
        });
      }
    }

    let params = [];
    if (props.renalAdjustment && gfrCalculated) {
      params.push({ title: "GFR", value: gfr + " mL/min" });
    }
    if (props.hepaticAdjustment && hepatic !== 0) {
      params.push({ title: "Child-Pugh score", value: hepatic });
    }
    if (bmiCalculated) {
      params.push({ title: "BMI", value: bmi + " Kg/m2" });
    }

    if (hemodialysis) {
      props.setOutput((prevState) => ({
        params: [],
        ...prevState,
      }));
    } else {
      props.setOutput((prevState) => ({
        params,
        ...prevState,
      }));
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
        renalOnlyParams={["gender"]}
        indication={props.indication}
        hemodialysisContra={true}
        hemodialysis={hemodialysis}
        setHemodialysis={setHemodialysis}
      />
    </>
  );
}
