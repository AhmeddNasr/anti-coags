const apixaban = {
  id: 2,
  name: "apixaban",
  route: "oral",
  indications: ["af", "dvtt", "dvtp"],
  dialysis: false,
  hepatic: true,
  switching: {
    heparin: [
      "Start the parenteral anticoagulant when the next dose of apixaban was scheduled to be given",
    ],
    fondaparinux: [
      "Start the parenteral anticoagulant when the next dose of apixaban was scheduled to be given",
    ],
    warfarin: [
      "Start warfarin now and consider adding parenteral bridging agent when next apixaban dose would have been due",
      "Start INR monitoring 2 days after stopping apixaban",
      "Stop parenteral bridging agent when INR is at goal",
    ],
    default: [
      "Start the new direct oral anticoagulant (DOAC) when the next dose of apixaban  was scheduled to be given",
    ],
  },
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
