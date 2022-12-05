import { Text } from "react-native";
import { useState, useEffect } from "react";
import {
  AgeInput,
  GenderInput,
  WeightInput,
  ScrInput,
  SubmitButton,
} from "../DoseScreen/components/custom-inputs";

export default function Rivaroxaban(props) {
  const [weight, setWeight] = useState(null);
  const [age, setAge] = useState(null);
  const [scr, setScr] = useState(null);
  const [gender, setGender] = useState(null);
  // const [gfr, setGfr] = useState(null);

  const calculateGFR = () => {
    const factor = gender === "m" ? 1 : 0.85;
    const GFR = ((140 - age) * weight * factor) / (scr * 72);
    return GFR;
  };

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
    const gfr = calculateGFR();
    // AF
    if (props.indication === "af") {
      if (gfr < 15) {
        props.setOutput({
          adjustmentType: 0,
          text: "Apixaban or warfarin is preferred",
          reason: "crcl less than 15 %",
        });
      } else if (gfr <= 50) {
        props.setOutput({
          adjustmentType: 1,
          text: "15 mg once daily with the evening meal.",
          reason: "crcl less than 50 %",
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
          reason: "crcl less than 30",
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
          reason: "crcl less than 30",
        });
      } else {
        props.setOutput({
          text: defaultOutput.dvtt,
        });
      }
    }
    //
  };

  return (
    <>
      <AgeInput setter={setAge} />
      <WeightInput setter={setWeight} />
      <ScrInput setter={setScr} />
      <GenderInput setter={setGender} />
      <Text>
        indication: {props.indication}, age: {age}
      </Text>
      <SubmitButton calculate={calculate} />
    </>
  );
}
