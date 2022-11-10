const apixaban = {
  id: 1,
  name: "apixaban",
  route: "oral",
  indications: ["af", "dvtt", "dvtp"],
  dialysis: false,
  hepatic: true,
  switching: ["titrate example drug 1 dose slowly over 2 days then ….."],
  warning: ["example warning 1", "example warning 2"],
  contra: ["contra with X", "contra with Y", "contra with Z"],
  precaution: ["example precaution 1", "example precaution 2"],
  dose: [
    {
      indication: "af",
      adjustmentParams: ["age", "weight", "scr"],
      adjustments: [
        {
          cond: [
            { scr: 1.5, direction: "less" },
            { age: 80, direction: "moreE" },
            { weight: 60, direction: "lessE" },
          ],
          n: 2,
          contra: false,
          output: "2.5 mg twice daily.",
        },
      ],
      hepaticAdjustment: { minimum: "b" },
      default: "5 mg twice daily.",
    },
    {
      indication: "dvtt",
      adjustments: [],
      default:
        "Oral: 10 mg twice daily for 7 days followed by 5 mg twice daily.",
    },
    {
      indication: "dvtp",
      adjustment: [],
      default: "Oral: 2.5 mg twice daily beginning 12 to 24 hours.",
    },
  ],
};

export default apixaban;
