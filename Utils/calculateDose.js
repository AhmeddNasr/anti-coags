import checkCondition from "./checkCondition";

export default function calculateDose(drugDose, info) {
  drugDose.adjustments.forEach((adjustment) => {
    if (checkCondition(info, adjustment.cond)) {
      return adjustment.output;
    }
  });
  return drugDose.default;
}
