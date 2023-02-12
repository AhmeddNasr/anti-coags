export default function calculateAdjustedBW(weight, height, gender) {
  let heightFoot = height / 30.48;
  let feetAboveThreshhold = heightFoot - 5;
  let inchesAboveThreshhold = feetAboveThreshhold * 12;
  let idealBW;
  if (gender === "m") {
    idealBW = 50 + 2.3 * inchesAboveThreshhold;
  } else {
    idealBW = 45.5 + 2.3 * inchesAboveThreshhold;
  }

  let AdjustedBW = idealBW + 0.4 * (weight - idealBW);
  return AdjustedBW;
}
