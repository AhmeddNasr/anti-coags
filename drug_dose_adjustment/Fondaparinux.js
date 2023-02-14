import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import { useState, useEffect } from "react";
import calculateBmi from "../Utils/calculateBmi";
import calculateGFR from "../Utils/calculateGFR";

export default function Fondaparinux(props) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [age, setAge] = useState("");
  const [scr, setScr] = useState("");
  const [gender, setGender] = useState("m");
  const [hemodialysis, setHemodialysis] = useState(false);

  useEffect(() => {
    calculate();
  }, [props.indication, hemodialysis]);

  function calculate() {
    let gfr;
    let gfrCalculated = false;
    if (gender === "" || age === "" || weight === "" || scr === "") {
      gfr = 90;
    } else {
      gfr = calculateGFR(gender, age, weight, scr);
      gfrCalculated = true;
    }

    let bmi;
    let bmiCalculated = false;

    if (weight !== "" && height !== "") {
      bmi = calculateBmi(weight, height);
      bmiCalculated = true;
    }
    if (hemodialysis && props.renalAdjustment) {
      props.setOutput({
        adjustmentType: 0,
        reason: "Fondaparinux is not used in dialysis",
      });
    } else if (props.renalAdjustment && gfr < 30) {
      props.setOutput({
        adjustmentType: 0,
        reason: "GFR < 30 mL/min",
      });
    } else if (props.indication === "dvtp") {
      if (weight !== "" && weight < 50) {
        props.setOutput({
          adjustmentType: 0,
          reason: "Weight < 50 Kg",
        });
      } else if (bmiCalculated && bmi >= 40) {
        props.setOutput({
          adjustmentType: 1,
          reason: "BMI ≥40 kg/m2",
          text: "SUBQ: 5 mg once daily.",
        });
      } else {
        props.setOutput({
          text: "SUBQ: 2.5 mg once daily.",
        });
      }
    } else if (props.indication === "dvtt") {
      if (bmiCalculated) {
        let text;
        if (weight > 100) {
          text = "10 mg once daily.";
        } else if (weight > 50) {
          text = "7.5 mg once daily.";
        } else {
          text = "5 mg once daily.";
        }
        props.setOutput({
          text,
        });
      } else {
        props.setOutput({
          text: "< 50 kg: 5 mg once daily.\n50 - 100 kg: 7.5 mg once daily.\n> 100 kg: 10 mg once daily. ",
        });
      }
    }

    console.log(gfr);
    console.log(gfrCalculated);
    let params = [];

    if (bmiCalculated) {
      params.push({ title: "BMI", value: bmi + " Kg/m2" });
    }
    if (props.renalAdjustment && gfrCalculated) {
      params.push({ title: "GFR", value: gfr + " mL/min" });
    }

    props.setOutput((prevState) => ({
      ...prevState,
      params,
    }));
  }
  return (
    <GenerateInputs
      weight={weight}
      setWeight={setWeight}
      height={height}
      setHeight={setHeight}
      scr={scr}
      setScr={setScr}
      gender={gender}
      setGender={setGender}
      age={age}
      setAge={setAge}
      hemodialysis={hemodialysis}
      setHemodialysis={setHemodialysis}
      calculate={calculate}
      renalOnlyParams={[]}
      renalAdjustment={props.renalAdjustment}
    />
  );
}
