import {
  SubmitButton,
  WeightInput,
  AgeInput,
  GenderInput,
  HepaticAdjustment,
  HeightInput,
  ConcamitantPgpInput,
  NsaidUseInput,
  BleedingHistoryInput,
  AntiplateletUseInput,
  Label,
  ScrInput,
  PlateletCountGroup,
} from "./custom-inputs";
import evaluateInput from "../../Utils/evaluateInput";
import { useState, useEffect } from "react";

export default function GenerateInputs(props) {
  const [validInput, setValidInput] = useState(false);
  useEffect(() => {
    if (
      evaluateInput(
        props.renalAdjustment,
        props.hepaticAdjustment,
        props.renalOnlyParams,
        {
          indication: props.indication,
          age: props.age,
          weight: props.weight,
          height: props.height,
          scr: props.scr,
        }
      )
    ) {
      if (!validInput) {
        setValidInput(true);
      }
    } else {
      setValidInput(false);
    }
  }, [
    props.age,
    props.weight,
    props.height,
    props.scr,
    props.renalAdjustment,
    props.hepaticAdjustment,
    props.renalOnlyParams,
  ]);
  return (
    <>
      {props.platlet && (
        <PlateletCountGroup value={props.platlet} setter={props.setPlatlet} />
      )}
      {props.setAge &&
        (props.renalAdjustment || !props.renalOnlyParams?.includes("age")) && (
          <AgeInput setter={props.setAge} value={props.age} />
        )}
      {props.setWeight &&
        (props.renalAdjustment ||
          !props.renalOnlyParams?.includes("weight")) && (
          <WeightInput setter={props.setWeight} value={props.weight} />
        )}
      {props.setHeight && (
        <HeightInput setter={props.setHeight} value={props.height} />
      )}
      {props.setScr && props.renalAdjustment && (
        <ScrInput setter={props.setScr} value={props.scr} />
      )}
      {props.setGender && props.renalAdjustment && (
        <GenderInput setter={props.setGender} value={props.gender} />
      )}
      {props.nsaid && (
        <>
          <Label title={"History"} />
          <ConcamitantPgpInput
            setter={props.pgp.setter}
            value={props.pgp.value}
          />
          <NsaidUseInput
            setter={props.nsaid.setter}
            value={props.nsaid.value}
          />
          <AntiplateletUseInput
            setter={props.platelet.setter}
            value={props.platelet.value}
          />
          <BleedingHistoryInput
            setter={props.bleeding.setter}
            value={props.bleeding.value}
          />
        </>
      )}
      {props.hepaticAdjustment && (
        <HepaticAdjustment setter={props.setHepatic} />
      )}
      <SubmitButton
        calculate={props.calculate}
        validInput={validInput}
        buttonTitle={props.buttonTitle}
      />
    </>
  );
}
