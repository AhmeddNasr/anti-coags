export default function evaluateInput(
  renalAdjustment,
  hepaticAdjustment,
  renalOnlyParams,
  data
) {
  if (data.indication === "") {
    return false;
  }

  if (renalAdjustment && !evaluateScr(data.scr)) {
    return false;
  }

  if (renalOnlyParams.includes("age")) {
    if (renalAdjustment && !evaluateScr(data.age)) {
      return false;
    }
  } else {
    if (!evaluateAge(data.age)) {
      return false;
    }
  }

  if (renalOnlyParams.includes("weight")) {
    if (renalAdjustment && !evaluateWeight(data.weight)) {
      return false;
    }
  } else {
    if (!evaluateScr(data.weight)) {
      return false;
    }
  }

  if (!evaluateHeight(data.height)) {
    return false;
  }

  return true;
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
