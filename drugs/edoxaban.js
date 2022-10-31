const edoxaban = {
  id: 1,
  name: "Edoxaban",
  route: "oral",
  indications: ["af", "dvtt"],
  dialysis: false,
  hepatic: false,
  switching: ["titrate example drug 1 dose slowly over 2 days then ….."],
  warning: ["example warning 1", "example warning 2"],
  contra: ["contra with X", "contra with Y", "contra with Z"],
  precaution: ["example precaution 1", "example precaution 2"],
  dose: [
    {
      indication: "af",
      adjustments: [
        {
          cond: [{ gfr: 15 }],
          output: "Use is contraindicated, Use Apixaban or Warfarin",
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
