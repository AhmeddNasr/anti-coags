import checkCondition from "./checkCondition";

export default function calculateDose(drugDose, info, indication) {
  // console.log(drugDose);
  let index = getIndicationIndex(drugDose, indication);
  let adjustments = drugDose[index].adjustments;
  for (let i = 0; i < adjustments.length; i++) {
    let adjustment = adjustments[i];
    if (checkCondition(info, adjustment.cond)) {
      return adjustment.output;
    }
  }
  return drugDose[index].default;
}

function getIndicationIndex(drugDose, indication) {
  for (let i = 0; i < drugDose.length; i++) {
    if (drugDose[i].indication === indication) {
      return i;
    }
  }
}
