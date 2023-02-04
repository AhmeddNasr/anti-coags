import { useState, useEffect } from "react";
import calculateGFR from "../Utils/calculateGFR";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";

export default function Rivaroxaban(props) {
  const [weight, setWeight] = useState(props.data?.weight || null);
  const [age, setAge] = useState(props.data?.age || null);
  const [scr, setScr] = useState(props.data?.scr || null);
  const [gender, setGender] = useState(props.data?.gender || null);
  const [hepatic, setHepatic] = useState(0);

  const defaultOutput = {
    af: "20 mg once daily with the evening meal",
    dvtt: "15 mg twice daily with food for 21 days followed by 20mg once daily with food",
    dvtp: "Oral: 10 mg once daily for a total duration of 31 to 39 days (including hospitalization and post discharge)",
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
    if (props.hepaticAdjustment && hepatic >= 7) {
      return props.setOutput({
        adjustmentType: 0,
        reason:
          "Avoid use with moderate to severe impairment (Child-Pugh class B or C) and any hepatic disease associated with coagulopathy.\n [Child-Pugh score: " +
          hepatic +
          " ]",
      });
    }
    if (gender === "" || age === "" || weight === "" || scr === "") {
      return;
    }
    const gfr = calculateGFR(gender, age, weight, scr);
    // AF
    if (props.indication === "af") {
      if (gfr < 15) {
        props.setOutput({
          adjustmentType: 0,
          text: "Apixaban or warfarin is preferred",
          reason:
            "GFR less than 15 mL/min\n[Estimated GFR: " + gfr + " mL/min]",
        });
      } else if (gfr <= 50) {
        props.setOutput({
          adjustmentType: 1,
          text: "15 mg once daily with the evening meal.",
          reason:
            "GFR less than 50 mL/min\n[Estimated GFR: " + gfr + " mL/min]",
        });
      } else {
        props.setOutput({
          text: defaultOutput.af,
        });
      }

      // DVTP
    } else if (props.indication === "dvtp") {
      if (gfr < 30) {
        props.setOutput({
          adjustmentType: 0,
          reason:
            "GFR less than 30 mL/min\n[Estimated GFR: " + gfr + " mL/min]",
        });
      } else {
        props.setOutput({
          text: defaultOutput.dvtp,
        });
      }

      // DVTT
    } else {
      if (gfr < 30) {
        props.setOutput({
          adjustmentType: 0,
          reason:
            "GFR less than 30 mL/min\n[Estimated GFR: " + gfr + " mL/min]",
        });
      } else {
        props.setOutput({
          text: defaultOutput.dvtt,
        });
      }
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
        hepaticAdjustment={props.hepaticAdjustment}
        setHepatic={setHepatic}
        renalAdjustment={props.renalAdjustment}
        renalOnlyParams={["age", "weight"]}
      />
    </>
  );
}
