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
} from "./custom-inputs";

export default function GenerateInputs(props) {
  return (
    <>
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
      <SubmitButton calculate={props.calculate} />
    </>
  );
}
