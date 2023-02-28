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
  RadioButton,
  ApttInput,
  DoseType,
  InrInput,
} from "./custom-inputs";
import evaluateInput from "../../Utils/evaluateInput";
import { useState, useEffect } from "react";

export default function GenerateInputs(props) {
  const [validInput, setValidInput] = useState(false);
  const [allDisabled, setAllDisabled] = useState(false);
  const [hepaticValid, setHepaticValid] = useState(false);

  useEffect(() => {
    if (
      props.hemodialysis &&
      props.hemodialysisContra &&
      props.renalAdjustment
    ) {
      props.calculate();
      setAllDisabled(true);
    } else {
      setAllDisabled(false);
    }
    // console.log(allDisabled);
  }, [props.hemodialysis, props.hemodialysisContra, props.renalAdjustment]);

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
          hepaticValid: hepaticValid,
          aptt: props.aptt,
        }
      )
    ) {
      if (!validInput) {
        setValidInput(true);
      }
    } else {
      if (validInput) {
        setValidInput(false);
      }
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
  if (props.indication === "monitoring" && props.aptt !== undefined) {
    return (
      <>
        <ApttInput setter={props.setAptt} value={props.aptt} />
        <SubmitButton
          calculate={props.calculate}
          validInput={validInput}
          buttonTitle={props.buttonTitle}
        />
      </>
    );
  }

  return (
    <>
      {props.setDoseType && (
        <DoseType value={props.doseType} setter={props.setDoseType} />
      )}
      {props.setInr && <InrInput value={props.inr} setter={props.setInr} />}
      {props.setHemodialysis && props.renalAdjustment && (
        <>
          <Label title="Dialysis" />
          <RadioButton
            value={true}
            setter={props.setHemodialysis}
            selected={props.hemodialysis}
            title={"Patient on dialysis"}
          />
          <RadioButton
            value={false}
            setter={props.setHemodialysis}
            selected={props.hemodialysis}
            title={"Patient not on dialysis"}
          />
        </>
      )}
      {!allDisabled && (
        <>
          {props.platlet && (
            <PlateletCountGroup
              value={props.platlet}
              setter={props.setPlatlet}
            />
          )}
          {props.setAge &&
            (props.renalAdjustment ||
              !props.renalOnlyParams?.includes("age")) && (
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
            <HepaticAdjustment
              setter={props.setHepatic}
              setHepaticValid={setHepaticValid}
              hepaticValid={hepaticValid}
            />
          )}
          <SubmitButton
            calculate={props.calculate}
            validInput={validInput}
            buttonTitle={props.buttonTitle}
          />
        </>
      )}
    </>
  );
}
