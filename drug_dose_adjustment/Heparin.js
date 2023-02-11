import { useState } from "react";
import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import calculateBmi from "../Utils/calculateBmi";
export default function Enoxaparin(props) {
  const [weight, setWeight] = useState(props.data?.weight || "");
  const [height, setHeight] = useState(props.data?.height || "");
  const [aptt, setAptt] = useState("");
  function calculate() {
    return;
  }
  return (
    <GenerateInputs
      weight={weight}
      setWeight={setWeight}
      height={height}
      setHeight={setHeight}
      calculate={calculate}
      renalOnlyParams={[]}
    />
  );
}
