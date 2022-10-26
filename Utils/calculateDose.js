import checkCondition from "./checkCondition";

export default function calculateDose(drugDose, info) {
  // console.log(drugDose);
  for (let i = 0; i < drugDose.adjustments.length; i++) {
    let adjustment = drugDose.adjustments[i];
    if (checkCondition(info, adjustment.cond)) {
      return adjustment.output;
    }
  }
  // drugDose.adjustments.forEach((adjustment) => {
  //   if (checkCondition(info, adjustment.cond)) {
  //     return adjustment.output;
  //   }
  // });
  return drugDose.default;
}
