import { useState, useEffect } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";

export default function Rivaroxaban(props) {
  const [weight, setWeight] = useState(props.data?.weight || "");
  const [age, setAge] = useState(props.data?.age || "");
  const [scr, setScr] = useState(props.data?.scr || "");
  const [gender, setGender] = useState(props.data?.gender || "m");
  const [hepatic, setHepatic] = useState(0);
  const [hemodialysis, setHemodialysis] = useState(false);

  const defaultOutput = {
    af: "20 mg once daily with the evening meal",
    dvtt: "15 mg twice daily with food for 21 days followed by 20mg once daily with food",
    dvtp: "Oral: 10 mg once daily for a total duration of 31 to 39 days (including hospitalization and post discharge)",
  };

  useEffect(() => {
    calculate();
  }, [props.indication, hemodialysis]);

  const calculate = () => {
    let gfr;
    let gfrCalculated = false;
    if (gender === "" || age === "" || weight === "" || scr === "") {
      gfr = 90;
    } else {
      gfr = calculateGFR(gender, age, weight, scr);
      gfrCalculated = true;
    }

    if (hemodialysis && props.adjustment === "renal") {
      props.setOutput({
        adjustmentType: 0,
        reason: "Rivaroxaban is not used in hemodialysis",
      });
    } else if (props.adjustment === "hepatic" && hepatic >= 7) {
      props.setOutput({
        adjustmentType: 0,
        reason:
          "Avoid use with moderate to severe impairment (Child-Pugh class B or C) and any hepatic disease associated with coagulopathy",
      });
    }

    // AF
    else if (props.indication === "af") {
      if (gfr < 15 && props.adjustment === "renal") {
        props.setOutput({
          adjustmentType: 0,
          text: "Apixaban or warfarin is preferred",
          reason: "GFR less than 15 mL/min",
        });
      } else if (gfr <= 50 && props.adjustment === "renal") {
        props.setOutput({
          adjustmentType: 1,
          text: "15 mg once daily with the evening meal.",
          reason: "GFR less than 50 mL/min",
        });
      } else {
        props.setOutput({
          text: defaultOutput.af,
        });
      }

      // DVTP
    } else if (props.indication === "dvtp") {
      if (gfr < 30 && props.adjustment === "renal") {
        props.setOutput({
          adjustmentType: 0,
          reason: "GFR less than 30 mL/min",
        });
      } else {
        props.setOutput({
          text: defaultOutput.dvtp,
        });
      }

      // DVTT
    } else if (props.adjustment === "renal") {
      if (gfr < 30 && props.adjustment === "renal") {
        props.setOutput({
          adjustmentType: 0,
          reason: "GFR less than 30 mL/min",
        });
      } else {
        props.setOutput({
          text: defaultOutput.dvtt,
        });
      }
    }
    if (hemodialysis && props.adjustment === "renal") {
      props.setOutput((prevState) => ({
        params: [],
        ...prevState,
      }));
    } else if (props.adjustment === "renal" && gfrCalculated) {
      props.setOutput((prevState) => ({
        params: [{ title: "GFR", value: gfr + " mL/min" }],
        ...prevState,
      }));
    } else if (props.adjustment === "hepatic" && hepatic !== 0) {
      props.setOutput((prevState) => ({
        params: [{ title: "Child-Pugh score", value: hepatic }],
        ...prevState,
      }));
    } else {
      props.setOutput((prevState) => ({
        params: [],
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
        setScr={setScr}
        scr={scr}
        setGender={setGender}
        gender={gender}
        calculate={calculate}
        hepaticAdjustment={props.adjustment === "hepatic"}
        setHepatic={setHepatic}
        renalAdjustment={props.adjustment === "renal"}
        renalOnlyParams={["age", "weight"]}
        hemodialysisContra={true}
        hemodialysis={hemodialysis}
        setHemodialysis={setHemodialysis}
      />
    </>
  );
}
