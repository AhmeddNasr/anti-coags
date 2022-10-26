const drugs = [
  {
    id: 0,
    name: "example drug",
    route: "oral",
    indications: ["af"],
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
    ],
  },
];

export default drugs;
