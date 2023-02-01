export default function calculateGFR(gender, age, weight, scr) {
  const factor = gender === "m" ? 1 : 0.85;
  const GFR = ((140 - age) * weight * factor) / (scr * 72);
  return GFR.toFixed(1);
}
