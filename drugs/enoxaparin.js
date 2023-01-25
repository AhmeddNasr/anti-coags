const enoxaparin = {
  id: 3,
  name: "enoxaparin",
  route: "oral",
  indications: ["dvtt", "dvtp"],
  dialysis: false,
  hepatic: true,
  switching: {
    warfarin: [
      "Start warfarin and continue enoxaparin for 5 days until INR is 2 or above before stopping LMWH.",
    ],
    default: [
      "	Start direct oral anticoagulant (DOAC) within 2 hours prior to the next scheduled dose of enoxaparin.",
    ],
  },
  warning: ["example warning 1", "example warning 2"],
  contra: ["contra with X", "contra with Y", "contra with Z"],
  precaution: ["example precaution 1", "example precaution 2"],
  dose: [
    {
      indication: "dvtt",
      adjustments: [],
      default:
        "1 mg/kg every 12 hours (preferred) or 1.5 mg/kg once every 24 hours subcutaneously Duration of therapeutic anticoagulation: * Provoked venous thromboembolism: 3 months * Unprovoked venous thromboembolism or provoked venous thromboembolism with a persistent risk factor: ≥3 months.",
    },
    {
      indication: "dvtp",
      adjustment: [
        {
          cond: [{ bmi: 50, direction: "more" }],
          output:
            "60 mg twice daily or 0.5 mg/kg twice daily (based on actual body weight).",
        },
        {
          cond: [{ bmi: 40, direction: "moreE" }],
          output:
            "40 mg twice daily  or 0.5 mg/kg twice daily (based on actual body weight). ",
        },
      ],
      default: "40 mg once daily",
    },
  ],
};

export default enoxaparin;
