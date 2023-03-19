import GenerateInputs from "../DoseScreen/components/GenerateInputs";
import { useState, useEffect } from "react";

export default function Warfarin(props) {
  const [doseType, setDoseType] = useState("initial");
  const [inrGoal, setInrGoal] = useState("");
  const [inr, setInr] = useState(0);
  useEffect(() => {
    calculate();
  }, [doseType, inrGoal]);
  function calculate() {
    if (doseType === "") {
      props.setOutput({
        text: "5 mg daily for 3 days, check INR the morning of day 4",
      });
    } else if (doseType === "initial" && inr !== 0) {
      let text;
      if (inr < 1.5) {
        text = "7.5 to 10 mg daily for 2 to 3 days";
      } else if (inr > 4) {
        text = "Hold warfarin until INR < 3";
      } else if (inr > 3.1) {
        text = "1.25 mg daily for 2 to 3 days";
      } else if (inr > 2) {
        text = "2.5 mg daily for 2 to 3 days";
      } else if (inr > 1.5) {
        text = "7.5 to 10 mg daily for 2 to 3 days";
      }
      props.setOutput({
        adjustmentType: 1,
        text,
      });
    } else if (doseType === "maintenance" && inr !== 0) {
      let text;
      let reason;
      let nine =
        "Hold until INR below upper limit of therapeutic range\nAdminister vitamin K orally.\nDecrease weekly maintenance dose by 5 % to 20 %";
      let eight =
        "Hold until INR below upper limit of therapeutic range\nDecrease weekly maintenance dose by 5% to 20%\nIf patient considered to be at significant risk for bleeding, consider low-dose oral vitamin K";
      let seven =
        "Consider holding 1 dose\nDecrease weekly maintenance dose by 5% to 15%";
      let six = "Decrease weekly maintenance dose by 5% to 10%";
      let five =
        "No dosage adjustment may be necessary if the last 2 INRs were in range, if there is no clear explanation for the INR to be out of range, and, if in the judgment of the clinician, the INR does not represent an increased risk of hemorrhage to patient; additional monitoring may be warranted\nIf dosage adjustment needed, decrease weekly maintenance dose by 5% to 10%";
      let four = "Desired range; no adjustment needed";
      let three =
        "• Increase weekly maintenance dose by 5% to 15%\n•	Consider a one-time supplemental dose of 1.5 to 2 times the daily maintenance dose\n•	No dosage adjustment may be necessary if the last 2 INRs were in range, if there is no clear explanation for the INR to be out of range, and, if in the judgment of the clinician, the INR does not represent an increased risk of thromboembolism for the patient; additional monitoring may be warranted\n•	If dosage adjustment needed, increase weekly maintenance dose by 5% to 10%.\n•	Consider a one-time supplemental dose of 1.5 to 2 times the daily maintenance dose\n• Decrease weekly maintenance dose by 5% to 20%";
      let one =
        "Increase weekly maintenance dose by 10% to 20%\nConsider a one-time supplemental dose of 1.5 to 2 times the daily maintenance dose";
      if (inrGoal === "regular") {
        if (inr > 10) {
          text = nine;
          reason = "INR >10";
        } else if (inr >= 4) {
          text = eight;
          reason = "INR 4 to 10";
        } else if (inr >= 3.5) {
          text = seven;
          reason = "INR 3.5 to 3.9";
        } else if (inr >= 3.3) {
          text = six;
          reason = "INR 3.3 to 3.4";
        } else if (inr >= 3.1) {
          text = five;
          reason = "INR 3.1 to 3.2";
        } else if (inr >= 2) {
          text = four;
          reason = "INR 2 to 3";
        } else if (inr >= 1.5) {
          text = three;
          reason = "INR 1.5 to 2";
        } else if (inr < 1.5) {
          text = one;
          reason = "INR < 1.5";
        }
      } else if (inrGoal === "high" && inr !== 0) {
        if (inr > 10) {
          text = nine;
          reason = "INR >10";
        } else if (inr >= 4.5) {
          text = eight;
          reason = "INR 4.5 to 10";
        } else if (inr >= 4) {
          text = seven;
          reason = "INR 4 to 4.4";
        } else if (inr >= 3.8) {
          text = six;
          reason = "INR 3.8 to 3.9";
        } else if (inr >= 3.6) {
          text = five;
          reason = "INR 3.6 to 3.7";
        } else if (inr >= 2.5) {
          text = four;
          reason = "INR 2.5 to 3.5";
        } else if (inr >= 2) {
          text = three;
          reason = "INR 2 to 2.4";
        } else if (inr < 2) {
          text = one;
          reason = "INR < 2";
        }
      } else {
        props.setOutput({});
      }
      props.setOutput({
        text,
        reason,
        adjustmentType: 1,
      });
    }
  }
  return (
    <>
      <GenerateInputs
        renalOnlyParams={[]}
        doseType={doseType}
        setDoseType={setDoseType}
        inrGoal={inrGoal}
        setInrGoal={setInrGoal}
        inr={inr}
        setInr={setInr}
        calculate={calculate}
      />
    </>
  );
}
