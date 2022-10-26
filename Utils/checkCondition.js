// all conditions lead to the same output
export default function checkCondition(info, condition) {
  // condition wa7da
  condition.forEach((object) => {
    for (let [key, value] of Object.entries(object)) {
      // check type of condition
      if (key === "gfr") {
        return isSmaller(info.gfr, value);
      } else {
        if (key === "bmi") {
          return isBigger(info.bmi, value);
        } else if (key === "weight") {
          return isBigger(info.weight, value);
        } else {
          return isBigger(info.age, value);
        }
      }
    }
  });
}

function isBigger(current, cutOff) {
  if (current > cutOff) {
    return true;
  }
  return false;
}

function isSmaller(current, cutOff) {
  if (current < cutOff) {
    return true;
  }
  return false;
}
