const rivaroxaban = {
  id: 0,
  name: "rivaroxaban",
  route: "oral",
  indications: ["af", "dvtp"],
  doseDVTT: 1,
  doseDVTP: 30,
  dialysis: false,
  hepatic: false,
  switching: {
    warfarin: [
      "Initiate warfarin and continue rivaroxaban for ≥2 days after first dose warfarin.",
      "After 2 days of coadministration, check an INR prior to the next scheduled dose of rivaroxaban.",
      "Continue coadministration of warfarin and rivaroxaban until INR ≥2.",
    ],
    default: [
      "Start anticoagulant when the next dose of rivaroxaban was scheduled to be given.",
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
