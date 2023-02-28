import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import { useState } from "react";

export default function Warfarin() {
  const [doseType, setDoseType] = useState(1);
  const [inr, setInr] = useState(0);
  function calculate() {
    return;
  }
  return (
    <>
      <GenerateInputs
        renalOnlyParams={[]}
        doseType={doseType}
        setDoseType={setDoseType}
        inr={inr}
        setInr={setInr}
        calculate={calculate}
      />
    </>
  );
}
