const heparin = {
  id: 4,
  name: "heparin",
  route: "parentral",
  indications: ["af", "dvtt", "dvtp", "hemo", "monitoring"],
  switching: {
    fondaparinux: [
      "Stop IV heparin and within 1 hour start SubQ fondaparinux.",
    ],
    enoxaparin: [
      "Start fondaparinux within one hour after UFH continuous infusion has been stopped",
    ],
    apixaban: ["Take first dose at the same time UFH is discontinued"],
    edoxaban: ["Take first dose 4 h after UFH is discontinued"],
    warfarin: [
      "Start warfarin and continue heparin infusion until INR is ≥2 for at least 2 measurements taken 24 hours apart",
    ],
    rivaroxaban: ["Take first dose at the same time UFH is discontinued"],
  },
};

export default heparin;
