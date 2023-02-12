const fondaparinux = {
  id: 6,
  name: "fondaparinux",
  route: "parentral",
  switching: {
    heparin: [
      "Start maintenance dose (no bolus) of unfractionated heparin 1 to 2 hours prior to when the next dose of fondaparinux is scheduled to be given",
    ],
    warfarin: [
      "Overlap fondaparinux and warfarin until a therapeutic INR has been established. Continue fondaparinux for a minimum of 5 days and until INR > 2.0 at least 24 hours.",
    ],
    oral: [
      "Start NOAC within 0 to 2 hours of when the next dose of fondaparinux is scheduled to be given.",
    ],
  },
};

export default fondaparinux;
