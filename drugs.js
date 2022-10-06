const drugs = [
  {
    id: 0,
    name: "example drug",
    doseDVTT: 1,
    intervalDVTT: "once per day",
    doseDVTP: 30,
    intervalDVTP: "once per day",
    dose: "BMI",
    renalAdjustment: [
      { range: 30, adjustment: 0, interval: "Contraindicated" },
      { range: 90, adjustment: 0.5, interval: "once every 2 days" },
    ],
    dialysis: false,
    hepatic: false,
    switching: ["titrate example drug 1 dose slowly over 2 days then ….."],
    warning: ["example warning 1", "example warning 2"],
    contra: ["contra with X", "contra with Y", "contra with Z"],
    precaution: ["example precaution 1", "example precaution 2"],
  },
  {
    id: 0,
    name: "example drug 2",
    doseAF: 10,
    intervalAF: "twice per day",
    doseDVTP: 40,
    intervalDVTP: "once per day",
    dose: "Wt",
    dialysis: true,
    hepatic: true,
    switching: ["example instructions"],
    warning: ["example warning 1"],
    contra: ["Contra with …"],
    precaution: ["example precaution 1"],
  },
];

export default drugs;
