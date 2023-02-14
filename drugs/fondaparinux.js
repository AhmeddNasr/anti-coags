const fondaparinux = {
  id: 6,
  name: "fondaparinux",
  route: "parentral",
  switching: {
    heparin: [
      "From therapeutic fondaparinux doses: Initiate parenteral anticoagulant when next fondaparinux dose is expected to be given. Incases of high bleeding risk, consider omitting initial bolus when transitioning to heparin infusion.",
      "From prophylaxis fondaparinux doses: Initiate parenteral anticoagulant as clinically needed irrespective of time of last fondaparinux dose",
    ],
    warfarin: [
      "Overlap fondaparinux and warfarin until a therapeutic INR has been established. Continue fondaparinux for a minimum of 5 days and until INR > 2.0 at least 24 hours.",
    ],
    enoxaparin: [
      "From therapeutic fondaparinux doses: Initiate parenteral anticoagulant when next fondaparinux dose is expected to be given.",
      "From prophylaxis fondaparinux doses: Initiate parenteral anticoagulant as clinically needed irrespective of time of last fondaparinux dose.",
    ],
    apixaban: [
      "From therapeutic fondaparinux doses: Initiate apixaban, when next fondaparinux dose is expected to be given.",
      "From prophylaxis fondaparinux doses: Initiate apixaban as clinically indicated irrespective of time of fondaparinux dose.",
    ],
    edoxaban: [
      "From therapeutic fondaparinux doses: intiate edoxaban when next fondaparinux dose is expected to be given.",
      "From prophylaxis fondaparinux doses: initiate edoxaban as clinically indicated irrespective of time of fondaparinux dose.",
    ],
    rivaroxaban: [
      "From therapeutic fondaparinux doses: initiate rivaroxaban when next fondaparinux dose is expected to be given.",
      "From prophylaxis fondaparinux doses: initiate rivaroxaban as clinically indicated irrespective of time of fondaparinux dose.",
    ],
    oral: [
      "Start NOAC within 0 to 2 hours of when the next dose of fondaparinux is scheduled to be given.",
    ],
  },
};

export default fondaparinux;
