export default function evaluateInput(data) {
  if (
    !evaluateAge(data.age) ||
    !evaluateWeight(data.weight) ||
    !evaluateScr(data.scr) ||
    !evaluateHeight(data.height)
  ) {
    return false;
  } else {
    return true;
  }
}

function evaluate(val, min, max) {
  if (val === "" || val > max || val < min) {
    return false;
  } else {
    return true;
  }
}

function evaluateAge(age) {
  return evaluate(age, 12, 110);
}

function evaluateWeight(weight) {
  return evaluate(weight, 30, 200);
}

function evaluateHeight(height) {
  return evaluate(height, 100, 250);
}

function evaluateScr(scr) {
  return evaluate(scr, 0.1, 70);
}
