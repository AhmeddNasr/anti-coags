const rivaroxaban = {
  id: 0,
  name: "Rivaroxaban",
  route: "oral",
  indications: ["af", "dvtp"],
  doseDVTT: 1,
  doseDVTP: 30,
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
      default: "Oral: 20 mg once daily with the evening meal",
    },
    {
      indication: "dvtp",
      adjustments: [
        {
          cond: [{ gfr: 30 }],
          output: "Use is contraindicated",
        },
      ],
      default:
        "Oral: 10 mg once daily for a total duration of 31 to 39 days (including hospitalization and post discharge)",
    },
  ],
};

export default rivaroxaban;
