// all conditions lead to the same output
export default function checkCondition(info, condition) {
  // condition wa7da
  for (let i = 0; i < condition.length; i++) {
    for (let [key, value] of Object.entries(condition[i])) {
      // check type of condition
      if (key === "gfr") {
        if (isSmaller(info.gfr, value)) {
          return true;
        }
      } else {
        if (key === "bmi") {
          if (isBigger(info.bmi, value)) {
            return true;
          }
        } else if (key === "weight") {
          if (isBigger(info.weight, value)) {
            return true;
          }
        } else {
          if (isBigger(info.age, value)) {
            return true;
          }
        }
      }
    }
  }

  // condition.forEach((object) => {
  //   for (let [key, value] of Object.entries(object)) {
  //     // check type of condition
  //     if (key === "gfr") {
  //       console.log("result", isSmaller(info.gfr, value));
  //     } else {
  //       if (key === "bmi") {
  //         if (isBigger(info.bmi, value);
  //       } else if (key === "weight") {
  //         if (isBigger(info.weight, value);
  //       } else {
  //         if (isBigger(info.age, value);
  //       }
  //     }
  //   }
  // });
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
