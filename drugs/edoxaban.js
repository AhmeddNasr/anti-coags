const edoxaban = {
  id: 1,
  name: "edoxaban",
  route: "oral",
  indications: ["af", "dvtt"],
  dialysis: false,
  hepatic: false,
  switching: {
    warfarin: [
      "If the dose of  Edoxaban is 60 mg once daily, reduce the dose to 30 mg once daily and begin warfarin concomitantly.",
      "If the dose of  Edoxaban is 30 mg once daily, reduce the dose to 15 mg once, begin warfarin concomitantly.",
      "Measure INR at least weekly and just prior to the daily dose of Edoxaban. Discontinue Edoxaban once a stable INR ≥2 is achieved; continue warfarin",
      "Discontinue Edoxaban and initiate a parenteral anticoagulant and warfarin at the time of the next scheduled Edoxaban dose.",
      "Discontinue the parenteral anticoagulant once a stable INR ≥2 is achieved; continue warfarin.",
    ],
    default: [
      "Start the new anticoagulant agent when the next dose of apixaban was scheduled to be given.",
    ],
  },
  warning: ["example warning 1", "example warning 2"],
  contra: ["contra with X", "contra with Y", "contra with Z"],
  precaution: ["example precaution 1", "example precaution 2"],
  dose: [
    {
      indication: "af",
      adjustments: [
        {
          cond: [{ gfr: 15, direction: "positive" }],
          output: "Use is contraindicated, Use Apixaban or Warfarin",
          contra: true,
        },
        {
          cond: [{ gfr: 50 }],
          output: "15 mg once daily with the evening meal",
        },
      ],
      default: "60 mg once daily",
    },
    {
      indication: "dvtt",
      adjustments: [
        {
          cond: [{ bmi: 40, weight: 120 }],
          output: "Avoid use",
        },
        {
          cond: [{ weight: 60 }],
          output: "60 mg once daily",
        },
      ],
      default: "Oral: 30 mg once daily",
    },
  ],
};

export default edoxaban;
