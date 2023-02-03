export default function calculateBmi(weight, height) {
  let bmi = weight / Math.pow(height / 100, 2);
  return bmi.toFixed(1);
}
